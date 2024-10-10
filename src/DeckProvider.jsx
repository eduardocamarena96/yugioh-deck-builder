import { createContext, useState } from 'react';

// Create the Deck Context
export const DeckContext = createContext();

// Provider Component
export function DeckProvider({ children }) {
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
    <DeckContext.Provider value={{ deck, addCard, removeCard }}>
      {children}
    </DeckContext.Provider>
  );
}