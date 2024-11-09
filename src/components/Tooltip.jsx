import { createPortal } from "react-dom";

export default function Tooltip({ position, show, cardInfo }) {
  const card = cardInfo;

  return createPortal(
    <div className={`tooltip ${show ? "show" : ""}`} style={position}>
      <div className="tooltip__card-info-wrapper">
        <h3 className="tooltip__card-name">{card.name}</h3>

        {(card.type === "Spell Card" || card.type === "Trap Card") && (
          <div className="tooltip__spell-or-trap-wrapper">
            <img
              className="tooltip__spell-or-trap-icon"
              src={`src/assets/icons/card-icons/${
                card.type === "Spell Card" ? "spell" : "trap"
              }.png`}
            />
            <p className="tooltip__spell-or-trap-type">
              {" "}
              {card.frameType.toUpperCase()}
            </p>
            <img
              className="tooltip__spell-or-trap-type-icon"
              src={`src/assets/icons/card-icons/${card.race.toLowerCase()}.png`}
            />
            <p className="tooltip__spell-or-trap-type">
              {" "}
              {card.race.toUpperCase()}
            </p>
          </div>
        )}

        {card.attribute && (
          <div className="tooltip__attribute-level-wrapper">
            <img
              className="tooltip__attribute-icon"
              src={`src/assets/icons/card-icons/${card.attribute.toLowerCase()}.png`}
            />
            <p className="tooltip__attribute"> {card.attribute}</p>

            {!(card.type === "Link Monster") && (
              <>
                <img
                  className="tooltip__level-icon"
                  src="src/assets/icons/card-icons/star.png"
                />
                <p className="tooltip__level"> {card.level}</p>{" "}
              </>
            )}
          </div>
        )}
      </div>

      {card.typeline && (
        <div className="tooltip__monster-info-wrapper">
          <p className="tooltip__monster-type">[{card.typeline.join(" / ")}]</p>
          <p className="tooltip__monster-atk-info">
            {card.atk || card.atk === 0
              ? `ATK: ${card.atk !== -1 ? card.atk : "?"}`
              : ""}
            {card.def || card.def === 0
              ? ` DEF: ${card.def !== -1 ? card.def : "?"}`
              : ""}
            {card.linkval && ` LINK: ${card.linkval}`}
          </p>
        </div>
      )}

      <p className="tooltip__card-description">{card.desc}</p>
    </div>,
    document.body
  );
}
