import { useState } from "react";
import DeckListDropdown from "./DeckListDropdown";

export default function DeckEditingOptions({ deck, setDeck }) {
  const [deckNameInput, setDeckNameInput] = useState(deck.name);
  console.log(deckNameInput);

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
        />
        <button onClick={() => deleteDeck(deckNameInput)}>Delete</button>
        <button className="deck-editing-buttons__undo">Undo</button>
        <button>Redo</button>
        <button onClick={() => addCards(deckNameInput, deck)}>Save</button>
        <button
          onClick={() => {
            setDeck({ name: "Untitled", main: [], extra: [], side: [] });
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

async function addCards(deckName, cards) {
  try {
    const response = await fetch("http://127.0.0.1:8000/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deckName: deckName, cards: cards }),
    });

    const data = await response.json();
    console.log("Cards added:", data);
  } catch (error) {
    console.error("Error adding cards:", error);
  }
}
