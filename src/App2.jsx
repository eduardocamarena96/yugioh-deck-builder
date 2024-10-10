import React from "react";
import { useState } from "react";
import { RemoveIcon, AddIcon, SearchIcon, CancelIcon } from "./Icons.jsx";
import topcards from "./top-yugioh-cards.js";

export default function App() {
  const [deck, setDeck] = useState([]);

  function addCard(name) {
    setDeck((prevDeck) => {
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
    });
  }

  function removeCard(name) {
    setDeck((prevDeck) => {
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
    });
  }

  return (
    <>
      <Header />
      <main className="edit-deck-container">
        <section className="search-cards-container">
          <SearchBar />

          <div className="cards-container">
            <TopCards deck={deck} addCard={addCard} removeCard={removeCard} />
          </div>
        </section>

        <section className="save-cards-container">
          <DeckEditingOptions />
          <DeckContainer
            deck={deck}
            addCard={addCard}
            removeCard={removeCard}
            type="Main"
          />
          <DeckContainer
            deck={deck}
            addCard={addCard}
            removeCard={removeCard}
            type="Extra"
          />
          <DeckContainer
            deck={deck}
            addCard={addCard}
            removeCard={removeCard}
            type="Side"
          />
        </section>
      </main>
    </>
  );
}

function SearchBar() {
  const [input, setInput] = "";

  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search"
        onChange={(event) => setInput(event.target.value)}
      />
      <CancelIcon />
    </div>
  );
}

function DeckEditingOptions() {
  return (
    <div className="deck-editing-options-container">
      <p className="deck-editing-options-container__deck-name">
        Editing: Deck Name
      </p>

      <div className="deck-editing-buttons">
        <button className="deck-editing-buttons__undo">Undo</button>
        <button>Redo</button>
        <button>Save</button>
        <button>Clear</button>
      </div>
    </div>
  );
}

function DeckContainer({ deck, addCard, removeCard, type }) {
  const deckSize = deck.reduce(
    (accumulator, card) => accumulator + card.count,
    0
  );

  const cardTypeCount =
    type === "Extra"
      ? "(0 Fusion | 0 Synchro | 0 Xyz | 0 Link)"
      : "(0 Monster | 0 Spell | 0 Trap)";
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

function TopCards({ deck, addCard, removeCard }) {
  const top12 = topcards.slice(0, 12);

  return (
    <>
      {top12.map((name) => {
        return (
          <Card
            key={name}
            deck={deck}
            addCard={addCard}
            removeCard={removeCard}
            name={name}
          >
            <AddOrRemoveCard
              deck={deck}
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

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { deck });
    }
    return child;
  });

  return (
    <div className="card">
      <img
        src={`http://localhost:3000/cards/image/${cardName}`}
        alt={cardName}
        onClick={() => addCard(name)}
        onContextMenu={(event) => {
          event.preventDefault();
          removeCard(name);
        }}
      />

      {isSmall && (
        <div>
          <div className="card-overlay__button">{count}x</div>
        </div>
      )}

      {childrenWithProps}
    </div>
  );
}

function AddOrRemoveCard({ deck, addCard, removeCard, name }) {
  const card = deck.find((card) => card.name === name);

  const cardCount = card ? card.count : 0;

  return (
    <div className="add-or-remove-card-container">
      <RemoveIcon cardCount={cardCount} removeCard={() => removeCard(name)} />
      <p className="cards-added-text">{cardCount} / 3</p>
      <AddIcon cardCount={cardCount} addCard={() => addCard(name)} />
    </div>
  );
}
