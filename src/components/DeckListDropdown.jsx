import { useState, useEffect } from "react";

export default function DeckListDropdown({ setDeck, setDeckNameInput }) {
  const [decksList, setDecksList] = useState(["one", "two", "three"]);
  const [dropdownValue, setDropdownValue] = useState("select-deck");

  function changeDropdownValue(event) {
    const deckName = event.target.value;
    setDropdownValue(deckName);
    fetchDeckData(deckName);
    setDeckNameInput(deckName);
  }

  async function fetchDeckData(deckName) {
    try {
      const response = await fetch("http://127.0.0.1:8000/cards");
      const data = await response.json();

      const deck = data.find((deck) => deck.deckName === deckName);
      setDeck(deck.cards);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/cards")
      .then((response) => response.json())
      .then((data) => {
        const names = data.map((deck) => deck.deckName);
        setDecksList(names);
      });
  }, []);

  return (
    <>
      <select
        className="deck-list-dropdown"
        value={dropdownValue}
        onChange={changeDropdownValue}
      >
        <option value="select-deck">Select Deck</option>
        {decksList.map((deckName) => (
          <option key={deckName} value={deckName}>
            {deckName}
          </option>
        ))}
      </select>
    </>
  );
}
