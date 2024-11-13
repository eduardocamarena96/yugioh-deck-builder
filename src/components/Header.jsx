import { NavLink } from "react-router-dom";

export default function Header() {
  const getActiveClass = ({ isActive }) =>
    isActive
      ? "header__navigation-link header__navigation-link--highlight"
      : "header__navigation-link";

  return (
    <>
      <header className="header">
        <NavLink to="/" className="header__title" end>
          Yugioh Deck Builder
        </NavLink>
        <NavLink to="/" className={getActiveClass} end>
          Home
        </NavLink>
        <NavLink to="/decks" className={getActiveClass} end>
          My Decks
        </NavLink>
        <NavLink to="/view" className={getActiveClass} end>
          View Deck
        </NavLink>
        <NavLink to="/edit" className={getActiveClass} end>
          Edit Deck
        </NavLink>
        <NavLink to="/cards" className={getActiveClass} end>
          Cards
        </NavLink>
      </header>
    </>
  );
}
