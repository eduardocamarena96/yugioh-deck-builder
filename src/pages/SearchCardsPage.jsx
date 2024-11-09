import { useState } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import cardNames from "../assets/card-names-list.json";
import topcards from "../assets/top-yugioh-cards.js";

export default function SearchCardsPage() {
  const [input, setInput] = useState("");

  function handleSetInput(event) {
    setInput(event.target.value);
  }

  function clearInput() {
    setInput("");
  }

  return (
    <>
      <Header />
      <section className="search-cards-container">
        <SearchBar
          input={input}
          setInput={handleSetInput}
          clearInput={clearInput}
        />

        <div className="cards-container cards-container__search-page">
          <PopularCards input={input} />
        </div>
      </section>
    </>
  );
}

function PopularCards({ input }) {
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
        return <Card key={name} name={name} isCardsPage={true} />;
      })}
    </>
  );
}
