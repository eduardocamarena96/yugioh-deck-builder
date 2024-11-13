import Header from "../components/Header";
import DeckContainer from "../components/DeckContainer";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import cardInfoHashmap from "../assets/card-info-hashmap.json";

export const CardInfoContext = createContext();

export default function ViewDecksPage() {
  const location = useLocation();
  const data = location.state;

  const [deck, setDeck] = useState(data ? data : {
    name: "Untitled",
    main: [],
    extra: [],
    side: [],
  });

  const navigate = useNavigate();
  const [displayedCard, setdisplayedCard] = useState(data ? cardInfoHashmap[data.main[0].name] : cardInfoHashmap["dark magician"]);
  console.log(displayedCard);

  useEffect(() => {
    async function getDeck(deckName) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/cards`);
        const data = await response.json();

        console.log(data);
        const deck = data.find((deck) => deck.name === deckName);
        setDeck(deck);
        setdisplayedCard(deck.main[0]);
      } catch (error) {
        console.log(error);
      }
    }

    // getDeck("size");
  }, []);

  const handleEditClick = () => {
    navigate("/edit", { state: deck });
  };

  return (
    <CardInfoContext.Provider value={setdisplayedCard}>
      <Header />
      <div className="view-deck-container">
        <div className="card-view">
          <img
            className="card-view__card-img"
            src={`http://localhost:3000/cards/image/${displayedCard.name.replace(
              ":",
              ""
            )}`}
          />
          <p>{displayedCard.name}</p>
          <p>{`${
            displayedCard.typeline
              ? `[${displayedCard.typeline.join(" / ")}]`
              : ``
          }`}</p>
          <p>{displayedCard.desc}</p>
        </div>

        <div className="deck-list-view">
          <div className="deck-list-view-options">
            <p className="deck-list-view-options__deck-name">
              Viewing: <span>{deck.name}</span>
            </p>
            <button
              onClick={handleEditClick}
              className="deck-list-view-options__edit-button"
            >
              Edit
            </button>
          </div>

          <DeckContainer deck={deck} type="main" isViewDecksPage={true} />
          <DeckContainer deck={deck} type="extra" isViewDecksPage={true} />
          <DeckContainer deck={deck} type="side" isViewDecksPage={true} />
        </div>
      </div>
    </CardInfoContext.Provider>
  );
}
