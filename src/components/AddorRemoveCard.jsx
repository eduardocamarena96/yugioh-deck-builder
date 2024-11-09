import { RemoveIcon, AddIcon } from "./Icons";
import getDeckType from "../helpers/get-deck-type-helper";

export default function AddOrRemoveCard({ deck, addCard, removeCard, name }) {
  const deckType = getDeckType(name);
  const card = deck[deckType].find((card) => card.name === name);

  const cardCount = card ? card.count : 0;

  return (
    <div className="add-or-remove-card-container">
      <RemoveIcon cardCount={cardCount} removeCard={() => removeCard(name)} />
      <p className="cards-added-text">{cardCount} / 3</p>
      <AddIcon cardCount={cardCount} addCard={() => addCard(name)} />
    </div>
  );
}
