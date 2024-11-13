import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import AddOrRemoveCard from "./AddorRemoveCard";
import cardNames from "../assets/card-names-list.json";
import topcards from "../assets/top-yugioh-cards.js";

export default function TopCards({
  deck,
  addCard,
  removeCard,
  input,
  cardsContainerRef,
}) {
  const [end, setEnd] = useState(20);

  function getNames() {
    if (!input) return;

    const list = cardNames;

    const newList = list.filter((name) => name.startsWith(input.toLowerCase()));

    return newList;
  }

  let list = topcards;

  if (input) {
    list = getNames();
  }

  useEffect(() => {
    cardsContainerRef.current.scrollTop = 0;
    setEnd(20);
  }, [input]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        cardsContainerRef.current;

      // Check if the user has scrolled to the bottom
      if (scrollHeight - scrollTop - clientHeight < 1) {
        console.log("You have reached the bottom!");
        setEnd((prev) => prev + 20);
      }
    };

    cardsContainerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      cardsContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {list.slice(0, end).map((name) => {
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
