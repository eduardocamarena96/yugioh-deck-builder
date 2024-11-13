import Card from "./Card";

export default function CardsContainer({ deck, addCard, removeCard, type, isViewDecksPage }) {
  return (
    <div className="cards-container cards-container--small">
      {deck &&
        deck[type].map((card) => (
          <Card
            key={card.name}
            name={card.name}
            addCard={addCard}
            removeCard={removeCard}
            count={card.count}
            isSmall={true}
            isViewDecksPage={isViewDecksPage}
          />
        ))}
    </div>
  );
}
