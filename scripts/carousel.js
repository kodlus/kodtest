"use strict"
/*============================================================================
IMPORTED DATA, VARIABLES, ETC. 
==============================================================================*/
import { addToCartClicked } from "./shopping_cart.js";

/*============================================================================
CONTENT & EXPORT FUNCTION
==============================================================================*/
export default async function loadCarousel() {
  try {
    const response = await fetch("data/carousel_cards.json");
    const carouselCards = await response.json();

    // 1. Get access to carousel elements, as well as create a cardIndex
    let cardIndex = 0;
    const carouselContainer = document.getElementById("carousel__container");
    const carouselNextButton = document.getElementById("indicator__next-button");
    const carouselPrevbutton = document
    .getElementById("indicator__previous-button");
    const cardIndicator = document.getElementById("indicator__number");
  
    
    // 2. Get the total numbers of cards, i.e. the length of the data object
    const numberOfCards = Object.keys(carouselCards).length;

    // 3. Initialize the carousel indicator
    cardIndicator.innerText = `${cardIndex + 1} / ${numberOfCards}`;

    // 4. Event listeners for buttons outside the carousel card
    carouselPrevbutton.addEventListener("mousedown", moveToPreviousCard);
    carouselNextButton.addEventListener("mousedown", moveToNextCard);

    // 5. Generate a carousel cards at the current cardIndex
    generateCard();

    // FUNCTIONS
    function generateCard () {
      carouselContainer.innerHTML =
      `
      <div class="product-card">
        <a href="${carouselCards[cardIndex].link} target="_blank" class="product-card__link">
          <img src="${carouselCards[cardIndex].image}" class="product-card__image">
        </a>
        
        <h3 class="product-card__product-name">
          ${carouselCards[cardIndex].product}
        </h3>
    
        <p class="product-card__description">
          ${carouselCards[cardIndex].description}
        </p>
    
        <p class="product-card__price">
          ${carouselCards[cardIndex].price} SEK
        </p>
        
        <div class="product-card__rating-container">
          <span class="product-card__star-rating margin-right">
          ${carouselCards[cardIndex].stars} <!-- Ändra till SVG -->
          </span>
    
          <span class="product-card__rating">
            ${carouselCards[cardIndex].rating}
          </span>
    
          <span class="product-card__reviews">
            (${carouselCards[cardIndex].reviews})
          </span>
      </div>

      <button class="button product-card__button button__add-to-cart">
        Lägg i varukorgen
      </button>
    </div> <!-- End of carousel product card -->
      `

      // 6. Access the buy button of the newly created product card 
      const buyButton = document.querySelector(".product-card__button");
      // 7. Hook event listener to the buy button, every time the card is generated. The event listener cannot be placed outside the generateCard function. In that case, the event listener will only be hooked onto the first generated card in the carousel, which disappears forever when the next or previous button is clicked. Every generated card is unique.
      buyButton.addEventListener("mousedown", addToCartClicked);
    }

    function moveToNextCard (e) {
      e.preventDefault();
    
      if (cardIndex === numberOfCards - 1) {
        cardIndex = 0
      } else {
        cardIndex++;
      }
      // Generate new card
      generateCard()
      // Update the indicator
      cardIndicator.innerText = `${cardIndex + 1} / ${numberOfCards}`;
    }
    
    function moveToPreviousCard (e) {
      e.preventDefault();

      if (cardIndex === 0) {
        cardIndex = numberOfCards - 1;
      } else {
        cardIndex--;
      }
      
      // Generate new card
      generateCard();
      // Update the indicator
      cardIndicator.innerText = `${cardIndex + 1} / ${numberOfCards}`;
    }
  } catch (error) {
    alert(`Error: ${error}`)
    console.log(`Error: ${error}`)
  }
}

/*============================================================================
RESOURCES
==============================================================================*/
// Creating a basic slideshow: https://www.w3schools.com/w3css/w3css_slideshow.asp