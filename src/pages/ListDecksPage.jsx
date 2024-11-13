import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function ListDecksPage() {
  const [decks, setDecks] = useState(null);

  console.log(decks);

  useEffect(() => {
    async function getDecks() {
      try {
        const response = await fetch("http://localhost:8000/cards");
        const data = await response.json();
        setDecks(data);
      } catch (error) {
        console.log(error);
      }
    }

    getDecks();
  }, []);

  return (
    <>
      <Header />
      <div className="decklist-container">
        {decks && decks.map((deck) => <DeckTile key={deck.name} deck={deck} />)}
      </div>
    </>
  );
}

function DeckTile({ deck }) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate("/view", { state: deck });
  };

  return (
    <div className="deck-tile">
      <div className="deck-tile-info">
        <p className="deck-tile-info__deck-name">{deck.name}</p>
        <div className="deck-tile-info-options">1 2 3</div>
      </div>

      <div className="deck-tile-card-images-wrapper">
        <img
          className="deck-tile__card-image"
          src={`http://localhost:3000/cards/image/${deck.main[0].name}`}
        />
        <img
          className="deck-tile__card-image"
          src={`http://localhost:3000/cards/image/${deck.main[1].name}`}
        />
        <img
          className="deck-tile__card-image"
          src={`http://localhost:3000/cards/image/${deck.main[2].name}`}
        />
      </div>

      <button onClick={handleViewClick} className="deck-tile__view-button">
        View
      </button>
    </div>
  );
}
