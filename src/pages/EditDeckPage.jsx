import { useState, useEffect } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TopCards from "../components/TopCards";
import DeckContainer from "../components/DeckContainer";
import DeckEditingOptions from "../components/DeckEditingOptions";
import getDeckType from "../helpers/get-deck-type-helper";

export default function EditDeckPage() {

  const [deck, setDeck] = useState({
    name: "Untitled",
    main: [],
    extra: [],
    side: [],
  });

  const [input, setInput] = useState("");

  console.log(deck);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/cards");
        const data = await response.json();
        console.log(data);
        if (data.length !== 0) setDeck(data[0].cards);
      } catch (error) {
        console.error("Error fetching deck data:", error);
      }
    }

    fetchData();
  }, []);

  function handleSetInput(event) {
    setInput(event.target.value);
  }

  function clearInput() {
    setInput("");
  }

  function addCard(name) {
    function add(prevDeck) {
      const deepCopy = JSON.parse(JSON.stringify(prevDeck));
      const deckType = getDeckType(name);

      const card = deepCopy[deckType].find((card) => card.name === name);

      if (!card) {
        deepCopy[deckType].push({ name: name, count: 1 });
        return deepCopy;
      }

      if (card.count < 3) {
        card.count++;
        return deepCopy;
      }

      return prevDeck;
    }

    setDeck(add);
  }

  function removeCard(name) {
    function remove(prevDeck) {
      const deepCopy = JSON.parse(JSON.stringify(prevDeck));
      const deckType = getDeckType(name);

      const cardIndex = deepCopy[deckType].findIndex(
        (card) => card.name === name
      );

      if (cardIndex === -1) return prevDeck;

      const card = deepCopy[deckType][cardIndex];

      if (card.count === 1) {
        deepCopy[deckType].splice(cardIndex, 1);
        return deepCopy;
      }

      deepCopy[deckType][cardIndex].count--;

      return deepCopy;
    }

    setDeck(remove);
  }

  return (
    <>
      <Header />
      <main className="edit-deck-container">
        <section className="search-cards-container">
          <SearchBar
            input={input}
            setInput={handleSetInput}
            clearInput={clearInput}
          />

          <div className="cards-container">
            <TopCards
              deck={deck}
              addCard={addCard}
              removeCard={removeCard}
              input={input}
            />
          </div>
        </section>

        <section className="save-cards-container">
          <DeckEditingOptions deck={deck} setDeck={setDeck} />
          <DeckContainer
            deck={deck}
            addCard={addCard}
            removeCard={removeCard}
            type="main"
          />
          <DeckContainer
            deck={deck}
            addCard={addCard}
            removeCard={removeCard}
            type="extra"
          />
          <DeckContainer
            deck={deck}
            addCard={addCard}
            removeCard={removeCard}
            type="side"
          />
        </section>
      </main>
    </>
  );
}
