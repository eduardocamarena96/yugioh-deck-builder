import { useState } from "react";
import DeckListDropdown from "./DeckListDropdown";

export default function DeckEditingOptions({ deck, setDeck }) {
  const [deckNameInput, setDeckNameInput] = useState(deck.name);
  const [toggle, setToggle] = useState(false);
  console.log(deckNameInput);

  async function addCards(deckName, deck) {
    try {
      const response = await fetch("http://127.0.0.1:8000/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deckName: deckName, deck: deck }),
      });

      const data = await response.json();
      setToggle((prev) => !prev);
      console.log("Cards added:", data);
    } catch (error) {
      console.error("Error adding cards:", error);
    }
  }

  async function updateCards(deckName, deck) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/decks/name/${deckName}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: deckName,
            main: deck.main,
            extra: deck.extra,
            side: deck.side,
          }),
        }
      );

      const data = await response.json();
      setToggle((prev) => !prev);
      console.log("Cards updated:", data);
    } catch (error) {
      console.error("Error adding cards:", error);
    }
  }

  async function deleteDeck(deckName) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/decks/name/${deckName}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Deck deleted successfully");
        // Handle the UI or state updates after successful deletion
        setDeck({ name: "", main: [], extra: [], side: [] });
        setDeckNameInput("");
        setToggle((prev) => !prev);
      } else {
        console.error("Failed to delete deck");
      }
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  }

  return (
    <div className="deck-editing-options-container">
      <div className="edit-deck-name-container">
        <label
          className="edit-deck-name-container__editing"
          htmlFor="deck-name"
        >
          Editing:
        </label>
        <input
          className="edit-deck-name-container__deck-name-input"
          placeholder="Deck Name"
          id="deck-name"
          value={deckNameInput}
          onChange={(e) => setDeckNameInput(e.target.value)}
        />
      </div>

      <div className="deck-editing-buttons">
        <DeckListDropdown
          setDeck={setDeck}
          setDeckNameInput={setDeckNameInput}
          toggle={toggle}
          deckName={deckNameInput}
        />
        <button onClick={() => deleteDeck(deckNameInput)}>Delete</button>
        <button className="deck-editing-buttons__undo">Undo</button>
        <button>Redo</button>
        <button onClick={() => addCards(deckNameInput, deck)}>Save</button>
        <button onClick={() => updateCards(deckNameInput, deck)}>Update</button>
        <button
          onClick={() => {
            setDeck({ name: "", main: [], extra: [], side: [] });
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
