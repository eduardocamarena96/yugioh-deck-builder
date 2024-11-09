import CardsContainer from "./CardsContainer";

import cardInfoHashmap from "../assets/card-info-hashmap.json";

export default function DeckContainer({ deck, addCard, removeCard, type }) {
  const deckSize = deck[type].reduce(
    (accumulator, card) => accumulator + card.count,
    0
  );

  const cardInfo = cardInfoHashmap;

  let spells = 0;
  let traps = 0;
  let monsters = 0;

  deck[type].forEach((card) => {
    if (cardInfo[card.name].frameType === "spell") spells += card.count;
    else if (cardInfo[card.name].frameType === "trap") traps += card.count;
    else {
      monsters += card.count;
    }
  });

  let fusion = 0;
  let xyz = 0;
  let synchro = 0;
  let link = 0;

  deck[type].forEach((card) => {
    if (cardInfo[card.name].frameType === "synchro") synchro += card.count;
    else if (cardInfo[card.name].frameType === "xyz") xyz += card.count;
    else if (cardInfo[card.name].frameType === "fusion") fusion += card.count;
    else {
      link += card.count;
    }
  });

  const cardTypeCount =
    type === "extra"
      ? `(${fusion} Fusion | ${synchro} Synchro | ${xyz} Xyz | ${link} Link)`
      : `(${monsters} Monster | ${spells} Spell | ${traps} Trap)`;
  return (
    <div className="deck-container">
      <div className="deck-type-header">
        <p className="deck-type-header__title">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
        <div className="deck-type-header__deck-count">
          <p>{deckSize}</p>
        </div>
        <p className="deck-type-header__card-type-count">{cardTypeCount}</p>
      </div>

      <CardsContainer
        deck={deck}
        addCard={addCard}
        removeCard={removeCard}
        type={type}
      />
    </div>
  );
}
