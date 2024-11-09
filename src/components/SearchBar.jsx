import { SearchIcon, CancelIcon } from "./Icons";

export default function SearchBar({ input, setInput, clearInput }) {
  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search"
        onChange={setInput}
        value={input}
      />
      <CancelIcon clearInput={clearInput} />
    </div>
  );
}
