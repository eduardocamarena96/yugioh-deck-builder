import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import EditDeckPage from "../pages/EditDeckPage";
import SearchCardsPage from "../pages/SearchCardsPage";
import ViewDecksPage from "../pages/ViewDecksPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/decks" element={<ViewDecksPage />} />
        <Route path="/edit" element={<EditDeckPage />} />
        <Route path="/cards" element={<SearchCardsPage />} />
      </Routes>
    </>
  );
}
