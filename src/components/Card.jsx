import { useState, useEffect, useRef, useContext } from "react";
import Tooltip from "./Tooltip";
import cardInfoHashmap from "../assets/card-info-hashmap.json";
import {CardInfoContext} from "../pages/ViewDecksPage";

export default function Card({
  name,
  addCard,
  removeCard,
  count,
  isSmall,
  isViewDecksPage = false,
  isCardsPage = false,
  children,
}) {
  const cardName = name;
  const cardInfo = cardInfoHashmap[cardName];
  
  // ViewDecksPage Context
  const setDisplayedCard = useContext(CardInfoContext);

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    function handlePosition() {
      if (cardRef.current) {
        const windowWidth = window.innerWidth;
        const tooltipWidth = 480;
        const cardRect = cardRef.current.getBoundingClientRect();

        const spaceTakenRight = cardRect.right + 1.05 * tooltipWidth;
        const spaceTakenLeft = cardRect.left - 1.05 * tooltipWidth;
        const middle = (cardRect.top + cardRect.bottom) / 2;

        if (spaceTakenRight > windowWidth) {
          setTooltipPosition({
            left: cardRect.left - tooltipWidth - 2,
            top: middle,
            transform: "translateY(-50%)",
          });
        } else if (spaceTakenLeft < 0) {
          setTooltipPosition({
            left: cardRect.right + 2,
            top: middle,
            transform: "translateY(-50%)",
          });
        } else {
          setTooltipPosition({
            left: cardRect.right + 2,
            top: middle,
            transform: "translateY(-50%)",
          });
        }
      }
    }

    handlePosition();
    window.addEventListener("resize", handlePosition);

    return () => {
      window.removeEventListener("resize", handlePosition);
    };
  }, [cardRef, showTooltip]);

  if (isCardsPage) {
    return (
      <div className="card">
        <img
          src={`http://localhost:3000/cards/image/${cardName}`}
          alt={cardName}
        />
      </div>
    );
  }

  return (
    <div className="card">
      <img
        onMouseEnter={() => {setShowTooltip(true); setDisplayedCard(cardInfo)}}
        onMouseLeave={() => setShowTooltip(false)}
        ref={cardRef}
        src={`http://localhost:3000/cards/image/${cardName}`}
        alt={cardName}
        onClick={() => addCard(name)}
        onContextMenu={(event) => {
          event.preventDefault();
          removeCard(name);
        }}
      />

      {!isViewDecksPage && (
        <Tooltip
          position={tooltipPosition}
          show={showTooltip}
          cardInfo={cardInfo}
        >
          <img
            src={`http://localhost:3000/cards/image/${cardName}`}
            alt={cardName}
          />
        </Tooltip>
      )}

      {isSmall && (
        <div>
          <div className="card-overlay__button">{count}x</div>
        </div>
      )}

      {children}
    </div>
  );
}
