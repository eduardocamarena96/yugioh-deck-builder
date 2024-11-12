import { useState } from "react";
import DeckListDropdown from "./DeckListDropdown";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      if (!response.ok) {
        toast.error("Failed to save the deck. Please try again.");
        return;
      }

      const data = await response.json();
      setToggle((prev) => !prev);
      console.log("Cards added:", data);
      toast.success("Deck saved successfully!");
    } catch (error) {
      console.error("Error adding cards:", error);
      toast.error("Failed to save the deck. Please try again.");
    }
  }

  // async function updateCards(deckName, deck) {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/decks/name/${deckName}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: deckName,
  //           main: deck.main,
  //           extra: deck.extra,
  //           side: deck.side,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     setToggle((prev) => !prev);
  //     console.log("Cards updated:", data);
  //   } catch (error) {
  //     console.error("Error adding cards:", error);
  //   }
  // }

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
        toast.success("Deck deleted successfully!");
        // Handle the UI or state updates after successful deletion
        setDeck({ name: "", main: [], extra: [], side: [] });
        setDeckNameInput("");
        setToggle((prev) => !prev);
      } else {
        console.error("Failed to delete deck");
        toast.error("Failed to delete deck. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting deck:", error);
      toast.error("Failed to delete deck. Please try again.");
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
        {/* <button className="deck-editing-buttons__undo">Undo</button>
        <button>Redo</button> */}
        <button
          onClick={() => {
            setDeck({ name: "", main: [], extra: [], side: [] });
          }}
        >
          Clear
        </button>
        <button onClick={() => deleteDeck(deckNameInput)}>Delete</button>
        <button onClick={() => addCards(deckNameInput, deck)}>Save</button>
        <ToastContainer
          stacked
          position="top-right"
          theme="dark"
          autoClose={2000}
        />
      </div>
    </div>
  );
}
