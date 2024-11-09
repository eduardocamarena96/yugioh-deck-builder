import cardTypeHashmap from "../assets/card-name-to-type-hashmap.json";

const extraDeckTypes = ["fusion", "synchro", "xyz", "link"];

export default function getDeckType(name) {
  const cardType = cardTypeHashmap[name.trim().toLowerCase().replace(":", "")];

  if (extraDeckTypes.includes(cardType)) {
    return "extra";
  }

  return "main";
}
