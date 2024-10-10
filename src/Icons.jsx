export {RemoveIcon, AddIcon, SearchIcon, CancelIcon};

// Svg Components

function RemoveIcon({ cardCount, removeCard }) {
    return (
      <svg
        onClick={removeCard}
        className={`circle-subtract-svg ${cardCount === 0 && "disable-button"}`}
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14Z"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 7.5H10.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  function AddIcon({ cardCount, addCard }) {
    return (
      <svg
        onClick={addCard}
        className={`circle-add-svg ${cardCount === 3 && "disable-button"}`}
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14Z"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 4.5V10.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 7.5H10.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  function SearchIcon() {
    return (
      <svg
        className="search-bar__search-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_71_18)">
          <path
            d="M10.2857 19.7143C15.493 19.7143 19.7143 15.493 19.7143 10.2857C19.7143 5.07846 15.493 0.857147 10.2857 0.857147C5.07843 0.857147 0.857117 5.07846 0.857117 10.2857C0.857117 15.493 5.07843 19.7143 10.2857 19.7143Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.1428 23.1429L17.1428 17.1429"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_71_18">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
  
  function CancelIcon() {
    return (
      <svg
        className="search-bar__cancel-icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_71_23)">
          <path
            d="M15.4286 0.571442L0.571411 15.4286"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.571411 0.571442L15.4286 15.4286"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_71_23">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }