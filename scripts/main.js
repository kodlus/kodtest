"use strict";
const v = "Hi! I'm a strict mode script!";

/*============================================================================
HEADER
==============================================================================*/
/*=========================================================
Global
=========================================================*/
const navButton = document.querySelector("#header__nav-button");
const headerNav = document.querySelector("#header__nav");
const shoppingCartButton = document.querySelector("#shopping-cart__button");
const shoppingCart = document.querySelector("#shopping-cart");
const shoppingCartDiv = document.querySelector(".header__shopping-cart");
const closeButton = document.querySelector("#shopping-cart__close-button")




/*=========================================================
Functions
=========================================================*/
const contentToggle= (element1, element2) => {
  // if the the element contains the class "is-hidden", remove it, else add it
  if (element1.classList.contains("is-hidden")) {
      element1.classList.remove("is-hidden");
      element2.classList.add("is-hidden");
  } else {
    element1.classList.add("is-hidden");
  }
}

/* Checks if a node is a child of a parent element. Returns true or false */
/* https://developer.mozilla.org/en-US/docs/Web/API/Node/contains */
function isAChildOf(node, parent) {
  return (node === parent) ? false: parent.contains(node)
}

/*=========================================================
Navigation
=========================================================*/
/* Toggle the navigation on or off */
navButton.addEventListener("click", (e) => {
    let ClosestBtn = e.target;
    if (closeButton) {
          contentToggle(headerNav, shoppingCart);
    console.log("clicked")
    }

});

/*=========================================================
Shopping cart
=========================================================*/
shoppingCartButton.addEventListener("click", () => {
  contentToggle(shoppingCart, headerNav);
});

/*=========================================================
Close/ open menus
=========================================================*/
document.addEventListener("click", (e) => {
  let node = e.target;
  /* Closes the shopping cart if the users clicks outside it. If the node is a child of shoppingCart, and contains the class button, nothing happens */
  if (isAChildOf(node, shoppingCart) !== true && e.target.classList.contains("button") !== true ){
    shoppingCart.classList.add("is-hidden")
  } 
  
  // Closes the headerNav if the user clicks outside it. If the node is a child of headerNav, and contains the class button, nothing happens
  if (isAChildOf(node, headerNav) !== true && e.target.classList.contains("button") !== true ) {
      headerNav.classList.add("is-hidden") }
});

closeButton.addEventListener("click", () => {
  shoppingCart.classList.add("is-hidden");
})

/*=========================================================
Hide information banner on scroll //MÅSTE SES ÖVER
https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
=========================================================*/
/* let previousScrollPosition = window.pageYOffset;
window.onscroll = function () {
  const informationBanner = document.getElementById("header__information-banner");
  let currentScrollPosition = window.pageYOffset;
  if (previousScrollPosition > currentScrollPosition) {
    informationBanner.style.visibility = "flex";
  } else {
    informationBanner.style.display = "none";
  }
  previousScrollPosition = currentScrollPosition;
} */

/*==============================================================================
MAIN
==============================================================================*/
/*=========================================================
Campaign section
=========================================================*/
/*====================================
Campaign carousel (https://www.w3schools.com/w3css/w3css_slideshow.asp)
=====================================*/
let cardIndex = 0;
const carouselContainer = document.getElementById("carousel__container");
const carouselNextButton = document.getElementById("indicator__next-button");
const carouselPrevbutton = document
  .getElementById("indicator__previous-button");
const indicatorNumber = document.getElementById("indicator__number");

// Fetching the card data and working with it
fetch("scripts/data.json")
  .then((response) => response.json())
  .then((cardCollection) => { 
    // Get the total numbers of cards, i.e. the length of the data object
    const totalCards = Object.keys(cardCollection).length;
    console.log(totalCards);

    // Initialize the carousel indicator
    indicatorNumber.innerText = `${cardIndex + 1} / ${totalCards}`;

    // Initialize the first card from cardCollection
    cards(cardCollection);

    // Add event listeners to the next and previous buttons
    carouselPrevbutton.addEventListener("mousedown", moveToPreviousCard);
    carouselNextButton.addEventListener("mousedown", moveToNextCard);

    /* Functions */

    // render the current card
    function cards () {
      carouselContainer.innerHTML =
      `
      <div class="carousel__product-card ">
      <a href="${cardCollection[cardIndex].link} target="_blank" ><img src="${cardCollection[cardIndex].image}"></a>
      <div class="product-card__details"> 
        <h3 class="details__product-name">
        ${cardCollection[cardIndex].product}
        </h3>
        <h3 class="details__tag-line">
        ${cardCollection[cardIndex].description}
        </h3>
        <p class="details__price">${cardCollection[cardIndex].price}</p>
        <div class="details__rating">
          ⭐⭐⭐⭐⭐ <!-- Ändra till SVG -->
          <span class="details__rating">${cardCollection[cardIndex].rating}</span>
          <span class="details__reviews">(${cardCollection[cardIndex].reviews})</span>
        </div>
      </div>
      <button class="product-card__button">Lägg i varukorgen</button>
    </div> <!-- End of carousel product card -->
      `
      // Reference the buy "lägg i varukorgen" button. Everytime cards() is envoked, the button is updated.
      const buyButton = document.querySelector(".product-card__button");
      
      // Add event listener to the buy button - it's dynamic
      buyButton.addEventListener("click", () => {
        console.log(`This is the ${cardIndex + 1} card`)
      })
    }
    
    function moveToNextCard (e) {
      e.preventDefault();
      if (cardIndex === totalCards - 1) {
        cardIndex = 0
      } else {
        cardIndex++;
      }
      // Update current card
      cards()
      indicatorNumber.innerText = `${cardIndex + 1} / ${totalCards}`;
      console.log(cardIndex)
      console.log("next card")
    }
    
    function moveToPreviousCard (e) {
      e.preventDefault();
      if (cardIndex === 0) {
        cardIndex = totalCards - 1;
      } else {
        cardIndex--;
      }
      
      // Update current card
      cards();
      indicatorNumber.innerText = `${cardIndex + 1} / ${totalCards}`;
      console.log(cardIndex)
      console.log("previous card")
    }
})



// GÖR SAMMA SAK FÖR POPULÄRA KATEGORIER: FETCH'EM!

// konstig bugg: andra sliden glitchar när den laddas. Sen funkar karusellen helt ok