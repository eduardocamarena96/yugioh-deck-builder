import Card from "./Card";
import AddOrRemoveCard from "./AddorRemoveCard";
import cardNames from "../assets/card-names-list.json";
import topcards from "../assets/top-yugioh-cards.js";

export default function TopCards({ deck, addCard, removeCard, input }) {
  function getNames() {
    if (!input) return;

    const list = cardNames;

    const newList = list.filter((name) => name.startsWith(input.toLowerCase()));

    return newList;
  }

  const top20 = topcards.slice(0, 20);

  let list = top20;

  if (input) list = getNames();

  return (
    <>
      {list.slice(0, 20).map((name) => {
        return (
          <Card
            key={name}
            name={name}
            addCard={addCard}
            removeCard={removeCard}
          >
            <AddOrRemoveCard
              deck={deck}
              name={name}
              addCard={addCard}
              removeCard={removeCard}
            />
          </Card>
        );
      })}
    </>
  );
}
