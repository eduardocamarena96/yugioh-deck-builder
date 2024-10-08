import { useState } from "react";

export default function App() {

  return (
    <>

      <Header />
      <main className="edit-deck-container">

        <section className="search-cards-container">

          <div className="search-bar">
            <SearchIcon />
            <input className="search-bar__input" type="text" placeholder="Search" />
            <CancelIcon />
          </div>

          <div className="cards-container">

          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>
          <Card>  <AddOrRemoveCard/>  </Card>

          </div>

        </section>

        <section className="save-cards-container">

          <div className="deck-editing-options-container">

            <p className="deck-editing-options-container__deck-name">Editing: Deck Name</p>

            <div className="deck-editing-buttons">

              <button className="deck-editing-buttons__undo">Undo</button>
              <button>Redo</button>
              <button>Save</button>
              <button>Clear</button>

            </div>

          </div>

          <div className="deck-container">

            <div className="deck-type-header">

              <p className="deck-type-header__title">Main</p>
              <div className="deck-type-header__deck-count">
                <p>40</p>
              </div>
              <p className="deck-type-header__card-type-count">(0 Monster | 0 Spell | 0 Trap)</p>

            </div>

            <CardsContainer />

          </div>

           <div className="deck-container">

            <div className="deck-type-header">

              <p className="deck-type-header__title">Extra</p>
              <div className="deck-type-header__deck-count">
                <p>15</p>
              </div>
              <p className="deck-type-header__card-type-count">(0 Fusion | 0 Synchro | 0 Xyz | 0 Link)</p>

            </div>

            <CardsContainer />

          </div>

           <div className="deck-container">

            <div className="deck-type-header">

              <p className="deck-type-header__title">Side</p>
              <div className="deck-type-header__deck-count">
                <p>15</p>
              </div>
              <p className="deck-type-header__card-type-count">(0 Monster | 0 Spell | 0 Trap)</p>

            </div>

            <CardsContainer />

          </div>

          
          
        </section>

      </main>
   
    
    
    </>
  )
}

function Header() {
  return(
    <>
       <header className="header">

        <h1 className="header__title">Yugioh Deck Builder</h1>
        <a className="header__navigation-link">My Decks</a>
        <a className="header__navigation-link header__navigation-link--highlight">Edit Deck</a>
        <a className="header__navigation-link">Cards</a>

      </header>

    </>
  )
}

function CardsContainer() {
  return (
    <div className="cards-container cards-container--small">

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />

            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
           
          </div>
  );
}

function Card({children}) {
  return (
  <div className="card">
    <img src="src\assets\cards\Eldlich the Golden Lord_Zombie_Effect Monster_lvl10_LIGHT.jpg" alt="Eldlich the Golden Lord"/>
   {children}

    {/* <AddOrRemoveCard /> */}
  </div>
  )
}

function AddOrRemoveCard() {

  const [cardsAdded, setCardsAdded] = useState(0);

  function handleRemoveCard() {
    if (cardsAdded !== 0) setCardsAdded(prevCardsAdded => prevCardsAdded - 1); 
  }

  function handleAddCard() {
    if (cardsAdded < 3) setCardsAdded(prevCardsAdded => prevCardsAdded + 1);
  }

  return (
    <div className="add-or-remove-card-container">
      <CircleSubtract cardsAdded={cardsAdded} onRemoveCard={handleRemoveCard}/>
      <p className="cards-added-text">{cardsAdded} / 3</p>
      <CircleAdd cardsAdded={cardsAdded} onAddCard={handleAddCard}/>
    </div>
  );
}

function CircleSubtract({cardsAdded, onRemoveCard}) {
  return (
    <svg onClick={onRemoveCard} className={`circle-subtract-svg ${cardsAdded === 0 && 'disable-button'}`} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 7.5H10.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

  )
}

function CircleAdd({cardsAdded, onAddCard}) {
  return (
    <svg onClick={onAddCard} className={`circle-add-svg ${cardsAdded === 3 && 'disable-button'}`} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 4.5V10.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.5 7.5H10.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="search-bar__search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_71_18)">
<path d="M10.2857 19.7143C15.493 19.7143 19.7143 15.493 19.7143 10.2857C19.7143 5.07846 15.493 0.857147 10.2857 0.857147C5.07843 0.857147 0.857117 5.07846 0.857117 10.2857C0.857117 15.493 5.07843 19.7143 10.2857 19.7143Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M23.1428 23.1429L17.1428 17.1429" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_71_18">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>

  );
}

function CancelIcon() {
  return (
    <svg className="search-bar__cancel-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_71_23)">
<path d="M15.4286 0.571442L0.571411 15.4286" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M0.571411 0.571442L15.4286 15.4286" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_71_23">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

  )
}