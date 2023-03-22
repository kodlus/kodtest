"use strict"
/*============================================================================
IMPORTED DATA, VARIABLES, ETC. 
==============================================================================*/
import { addToCartClicked } from "./shopping_cart.js";
import { popularProductCardHtml } from "./cards_html.js";

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
    const popularProdContainer = document.getElementById("popular-products__card-container");

    // 3. Render all of the cards inside the popularProductsCard object
    // 3.1 Use a for-in loop
    for (const property in popularProductsCards) {
      // 3.2 Create card elements by applying relevant properties from popular products cards to the HTML template, and then add every card into the popular product container
      popularProdContainer.innerHTML += popularProductCardHtml(popularProductsCards, property)
    } // End of loop
  
    // 4. Select all of the newly created buy buttons. Choose the right product-card class. Otherwise, the first card in the carousel will fire twice since popular product cards and carousel card share the product-card__button class
    const buyBtn = document.querySelectorAll(".product-card__button--popular");

    // 5. Loop over the buttons and attach an event listener on each element
    buyBtn.forEach(button => button.addEventListener("click", addToCartClicked));
  
  } catch(error) {
    alert(`Error: ${error}`)
  }
}

/*============================================================================
RESOURCES
==============================================================================*/
 // How to loop through the buttons and attach an event listener on each element: https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class 