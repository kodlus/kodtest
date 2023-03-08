"use strict"
/*============================================================================
IMPORTED DATA, VARIABLES, ETC. 
==============================================================================*/
import { addToCartClicked } from "./shopping_cart.js";

/*============================================================================
CONTENT & EXPORT FUNCTION
==============================================================================*/
export default async function loadPopularProducts() {
  try {
    const response = await fetch("data/popular_prod_cards.json")
    const popularProductsCards = await response.json();

    // 1. Get the length of the popularProductsCards object
    const popularProductsLength = Object.keys(popularProductsCards).length;
    // 2. Get access to the popular products container
    const popularProdContainer = document.getElementById("product-cards__container--popular");

    // 3. Render all of the cards inside the popularProductsCard object
    // 3.1 Use a for-in loop
    for (const property in popularProductsCards) {
      // 3.2 Create card elements by applying relevant properties from popular products cards to the HTML template, and then add every card into the popular product container
      popularProdContainer.innerHTML += `
      <!-- Popular product card -->
      <div class="product-card product-card--popular"> 
        <a href="${popularProductsCards[property].link}" class="product-card__link">
          <img src="${popularProductsCards[property].image}" 
          alt="" 
          class="product-card__image product-card__image--popular">
        </a>

         <h3 class="product-card__product-name">
          ${popularProductsCards[property].product}
        </h3>

          <p class="product-card__description product-card__description--popular">
          ${popularProductsCards[property].description} 
          </p>

          <p class="product-card__price product-card__price--popular">
            ${popularProductsCards[property].price} SEK
          </p>

          <div class="product-card__rating-container product-card__rating-container--popular">
            <span class="product-card__star-rating product-card__star-rating--popular margin-right">
            ${popularProductsCards[property].stars} <!-- Ändra till SVG -->
            </span>
            
            <span class="product-card__rating product-card__rating--popular margin-right">
            ${popularProductsCards[property].rating}
            </span>

            <span class="product-card__reviews product-card__reviews--popular">
            ${popularProductsCards[property].reviews}
            </span>
          </div>

        <button class="button product-card__button product-card__button--popular button__add-to-cart">
          Lägg i varukorgen
        </button>
      </div> <!-- End of product card -->
      `
    } // End of loop
  
    // 4. Select all of the newly created buy buttons. Choose the right product-card class. Otherwise, the first card in the carousel will fire twice since popular product cards and carousel card share the product-card__button class
    const buyBtn = document.querySelectorAll(".product-card__button--popular");

    // 5. Loop over the buttons and attach an event listener on each element
    buyBtn.forEach(button => button.addEventListener("mouseup", addToCartClicked));
  
  } catch(error) {
    alert(`Error: ${error}`)
    console.log(`Error: ${error}`)
  }
}

/*============================================================================
RESOURCES
==============================================================================*/
 // How to loop through the buttons and attach an event listener on each element: https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class 