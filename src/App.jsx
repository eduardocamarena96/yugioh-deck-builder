import topcards from "./top-yugioh-cards.js";
import { useContext } from "react";
import { DeckContext, DeckProvider } from "./DeckProvider";
import { RemoveIcon, AddIcon, SearchIcon, CancelIcon } from "./Icons.jsx";

export default function App() {
  const [input, setInput] = "";

  return (
    <>
      <DeckProvider>
        <Header />
        <main className="edit-deck-container">
          <section className="search-cards-container">
            <SearchBar />

            <div className="cards-container">
              <TopCards />
            </div>
          </section>

          <section className="save-cards-container">
            <DeckEditingOptions />
            <DeckContainer type="Main" />
            <DeckContainer type="Extra" />
            <DeckContainer type="Side" />
          </section>
        </main>
      </DeckProvider>
    </>
  );
}

function SearchBar() {
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

function DeckContainer({ type }) {
  const { deck } = useContext(DeckContext);

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

      <CardsContainer />
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

function CardsContainer() {
  const { deck } = useContext(DeckContext);

  return (
    <div className="cards-container cards-container--small">
      {deck &&
        deck.map((card) => (
          <Card
            key={card.name}
            name={card.name}
            count={card.count}
            isSmall={true}
          />
        ))}
    </div>
  );
}

function TopCards() {
  const top12 = topcards.slice(0, 12);

  return (
    <>
      {top12.map((name) => {
        return (
          <Card key={name} name={name}>
            <AddOrRemoveCard name={name} />
          </Card>
        );
      })}
    </>
  );
}

function Card({ name, count, isSmall, children }) {
  const { addCard, removeCard } = useContext(DeckContext);

  const cardName = name ? name.replace(":", "") : "Dark Magician";

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

      {children}
    </div>
  );
}

function AddOrRemoveCard({ name }) {
  const { deck, addCard, removeCard } = useContext(DeckContext);

  // Get the current card info, if it exists
  const currentCard = deck.find((card) => card.name === name);
  const currentCount = currentCard ? currentCard.count : 0;

  return (
    <div className="add-or-remove-card-container">
      <RemoveIcon
        cardCount={currentCount}
        removeCard={() => removeCard(name)}
      />
      <p className="cards-added-text">{currentCount} / 3</p>
      <AddIcon cardCount={currentCount} addCard={() => addCard(name)} />
    </div>
  );
}