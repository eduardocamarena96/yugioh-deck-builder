import { useState, useEffect, useRef } from "react";
import Tooltip from "./Tooltip";
import cardInfoHashmap from "../assets/card-info-hashmap.json";

export default function Card({
  name,
  addCard,
  removeCard,
  count,
  isSmall,
  isCardsPage = false,
  children,
}) {
  const cardName = name;
  const cardInfo = cardInfoHashmap[cardName];

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
        onMouseEnter={() => setShowTooltip(true)}
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
      {isSmall && (
        <div>
          <div className="card-overlay__button">{count}x</div>
        </div>
      )}

      {children}
    </div>
  );
}
