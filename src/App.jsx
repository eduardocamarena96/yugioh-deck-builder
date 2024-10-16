import React from "react";
import { useState, useEffect, useRef } from "react";
import { RemoveIcon, AddIcon, SearchIcon, CancelIcon } from "./Icons.jsx";

import topcards from "./assets/top-yugioh-cards.js";
import cardTypeHashmap from "./assets/card-name-to-type-hashmap.json";
import cardInfoHashmap from "./assets/card-info-hashmap.json";
import cardNames from "./card-names-list.json";

const extraDeckTypes = ["fusion", "synchro", "xyz", "link"];

export default function App() {
  const [deck, setDeck] = useState([]);
  const [extraDeck, setExtraDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [input, setInput] = useState("");

  function handleSetInput(event) {
    setInput(event.target.value);
  }

  function clearInput() {
    setInput("");
  }

  function addCard(name, type) {
    function add(prevDeck) {
      // Create a shallow copy of the previous deck
      const copy = [...prevDeck];

      // Find the index of the card, if it exists
      const cardIndex = copy.findIndex((card) => card.name === name);

      if (cardIndex === -1) {
        // Card doesn't exist in the deck, add it with count 1
        return [...copy, { name: name, count: 1 }];
      } else {
        // Card already exists, check if the count is less than 3
        const card = copy[cardIndex];
        if (card.count < 3) {
          // Create a new object for immutability, don't modify existing card object
          const updatedCard = { ...card, count: card.count + 1 };
          // Return a new deck with the updated card at the correct index
          return [
            ...copy.slice(0, cardIndex), // All cards before the updated card
            updatedCard, // The updated card
            ...copy.slice(cardIndex + 1), // All cards after the updated card
          ];
        }
      }

      // If the count is already 3, return the unchanged deck
      return copy;
    }

    if (extraDeckTypes.includes(type)) {
      setExtraDeck(add);
    } else {
      setDeck(add);
    }
  }

  function removeCard(name, type) {
    function remove(prevDeck) {
      const copy = [...prevDeck];

      for (let index = 0; index < copy.length; index++) {
        if (copy[index].name === name) {
          if (copy[index].count === 1) {
            copy.splice(index, 1);
            break;
          }

          const card = copy[index];
          const updatedCard = { ...card, count: card.count - 1 };

          return [
            ...copy.slice(0, index), // All cards before the updated card
            updatedCard, // The updated card
            ...copy.slice(index + 1), // All cards after the updated card
          ];
        }
      }

      return copy;
    }

    if (extraDeckTypes.includes(type)) {
      setExtraDeck(remove);
    } else {
      setDeck(remove);
    }
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
              extraDeck={extraDeck}
              addCard={addCard}
              removeCard={removeCard}
              input={input}
            />
          </div>
        </section>

        <section className="save-cards-container">
          <DeckEditingOptions
            deck={deck}
            extraDeck={extraDeck}
            setDeck={setDeck}
            setExtraDeck={setExtraDeck}
          />
          <DeckContainer
            deck={deck}
            extraDeck={extraDeck}
            addCard={addCard}
            removeCard={removeCard}
            type="Main"
          />
          <DeckContainer
            deck={extraDeck}
            extraDeck={extraDeck}
            addCard={addCard}
            removeCard={removeCard}
            type="Extra"
          />
          <DeckContainer
            deck={sideDeck}
            extraDeck={extraDeck}
            addCard={addCard}
            removeCard={removeCard}
            type="Side"
          />
        </section>
      </main>
    </>
  );
}

function SearchBar({ input, setInput, clearInput }) {
  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search"
        onChange={setInput}
        value={input}
      />
      <CancelIcon clearInput={clearInput} />
    </div>
  );
}

function DeckEditingOptions({
  deck,
  extraDeck,
  sideDeck,
  setDeck,
  setExtraDeck,
  setSideDeck,
}) {
  return (
    <div className="deck-editing-options-container">
      <p className="deck-editing-options-container__deck-name">
        Editing: Deck Name
      </p>

      <div className="deck-editing-buttons">
        <button className="deck-editing-buttons__undo">Undo</button>
        <button>Redo</button>
        <button>Save</button>
        <button
          onClick={() => {
            setDeck([]);
            setExtraDeck([]);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function DeckContainer({ deck, extraDeck, addCard, removeCard, type }) {
  const deckSize = deck.reduce(
    (accumulator, card) => accumulator + card.count,
    0
  );

  const cardInfo = cardInfoHashmap;

  let spells = 0;
  let traps = 0;
  let monsters = 0;

  deck.forEach((card) => {
    if (cardInfo[card.name].frameType === "spell") spells += card.count;
    else if (cardInfo[card.name].frameType === "trap") traps += card.count;
    else {
      monsters += card.count;
    }
  });

  let fusion = 0;
  let xyz = 0;
  let synchro = 0;
  let link = 0;

  extraDeck.forEach((card) => {
    if (cardInfo[card.name].frameType === "synchro") synchro += card.count;
    else if (cardInfo[card.name].frameType === "xyz") xyz += card.count;
    else if (cardInfo[card.name].frameType === "fusion") fusion += card.count;
    else {
      link += card.count;
    }
  });

  const cardTypeCount =
    type === "Extra"
      ? `(${fusion} Fusion | ${synchro} Synchro | ${xyz} Xyz | ${link} Link)`
      : `(${monsters} Monster | ${spells} Spell | ${traps} Trap)`;
  return (
    <div className="deck-container">
      <div className="deck-type-header">
        <p className="deck-type-header__title">{type}</p>
        <div className="deck-type-header__deck-count">
          <p>{deckSize}</p>
        </div>
        <p className="deck-type-header__card-type-count">{cardTypeCount}</p>
      </div>

      <CardsContainer deck={deck} addCard={addCard} removeCard={removeCard} />
    </div>
  );
}

function Header() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Yugioh Deck Builder</h1>
        <a className="header__navigation-link">My Decks</a>
        <a className="header__navigation-link header__navigation-link--highlight">
          Edit Deck
        </a>
        <a className="header__navigation-link">Cards</a>
      </header>
    </>
  );
}

function CardsContainer({ deck, addCard, removeCard }) {
  return (
    <div className="cards-container cards-container--small">
      {deck &&
        deck.map((card) => (
          <Card
            key={card.name}
            deck={deck}
            addCard={addCard}
            removeCard={removeCard}
            name={card.name}
            count={card.count}
            isSmall={true}
          />
        ))}
    </div>
  );
}

function TopCards({ deck, extraDeck, addCard, removeCard, input }) {
  function getNames() {
    if (!input) return;

    const list = cardNames;

    const newList = list.filter((name) => name.startsWith(input.toLowerCase()));

    return newList;
  }

  const top12 = topcards.slice(0, 20);

  let list = top12;

  if (input) list = getNames();

  function whichDeck(name) {
    const cardType =
      cardTypeHashmap[name.trim().toLowerCase().replace(":", "")];

    if (extraDeckTypes.includes(cardType)) {
      return "extra";
    }

    return "main";
  }

  return (
    <>
      {list.slice(0, 20).map((name) => {
        return (
          <Card
            key={name}
            deck={whichDeck(name) === "extra" ? extraDeck : deck}
            addCard={addCard}
            removeCard={removeCard}
            name={name}
          >
            <AddOrRemoveCard
              addCard={addCard}
              removeCard={removeCard}
              name={name}
            />
          </Card>
        );
      })}
    </>
  );
}

function Card({ deck, addCard, removeCard, name, count, isSmall, children }) {
  const cardName = name ? name.replace(":", "") : "Dark Magician";
  const cardType = cardTypeHashmap[cardName];
  const cardInfo = cardInfoHashmap[cardName];

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { deck, type: cardType });
    }
    return child;
  });

  const [position, setPosition] = useState("right"); // To control tooltip position
  const cardRef = useRef(null);

  useEffect(() => {
    const handlePosition = () => {
      if (cardRef.current) {
        const tooltip = cardRef.current.nextSibling; // Using nextSibling to get tooltip
        const container = cardRef.current.closest(".cards-container"); // Get the container

        if (tooltip && container) {
          const cardRect = cardRef.current.getBoundingClientRect();
          const tooltipRect = tooltip.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          // Calculate space on the right and left of the card
          const spaceOnRight = containerRect.right - cardRect.right;
          const spaceOnLeft = cardRect.left - containerRect.left;

          // Ensure no overflow on right or left
          if (spaceOnRight < tooltipRect.width) {
            // console.log('Not enough space on the right, position tooltip on the left');
            setPosition("left");
          } else if (spaceOnLeft < tooltipRect.width) {
            // console.log('Not enough space on the left, position tooltip on the right');
            setPosition("right");
          } else {
            // console.log('Enough space, keeping default position');
            setPosition("right");
          }
        }
      }
    };

    handlePosition(); // Trigger immediately on mount
    window.addEventListener("resize", handlePosition); // Update on window resize

    return () => {
      window.removeEventListener("resize", handlePosition); // Cleanup
    };
  }, [cardRef]);

  return (
    <div className="card">
      <img
        ref={cardRef}
        src={`http://localhost:3000/cards/image/${cardName}`}
        alt={cardName}
        onClick={() => addCard(name, cardType)}
        onContextMenu={(event) => {
          event.preventDefault();
          removeCard(name, cardType);
        }}
      />

      <Tooltip position={position} cardInfo={cardInfo} />

      {isSmall && (
        <div>
          <div className="card-overlay__button">{count}x</div>
        </div>
      )}

      {childrenWithProps}
    </div>
  );
}

function AddOrRemoveCard({ deck, addCard, removeCard, name, type }) {
  const card = deck.find((card) => card.name === name);

  const cardCount = card ? card.count : 0;

  return (
    <div className="add-or-remove-card-container">
      <RemoveIcon
        cardCount={cardCount}
        removeCard={() => removeCard(name, type)}
      />
      <p className="cards-added-text">{cardCount} / 3</p>
      <AddIcon cardCount={cardCount} addCard={() => addCard(name, type)} />
    </div>
  );
}

function Tooltip({ position, cardInfo }) {
  const card = cardInfo
    ? cardInfo
    : { name: "Name", humanReadableCardType: "Type", desc: "description here" };

  return (
    <div className={`tooltip ${position}`}>
      <h3>{card.name}</h3>
      <p>
        Type: {card.humanReadableCardType}{" "}
        {card.atk !== undefined ? `/ ATK: ${card.atk}` : ""}
        {card.def !== undefined ? `/ DEF: ${card.def}` : ""}
      </p>
      <p>Effect: {card.desc}</p>
    </div>
  );
}
