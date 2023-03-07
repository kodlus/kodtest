"use strict";
const v = "Hi! I'm a strict mode script!";

import {productsData} from "/scripts/data.js"
console.log(productsData);

/*============================================================================
HEADER
==============================================================================*/
/*=========================================================
TOGGLE MENUS
=========================================================*/
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

/*=========================================================
SHOPPING CART INTERACTION
https://youtu.be/YeFzkC2awTM?t=541
=========================================================*/
/*====================================
Global
=====================================*/

// READY STATE FUNCTION? 
// Get all of the delete buttons
const removeCartItemButtons = document
  .querySelectorAll(".shopping-cart-item__button--delete");

// Get all of the quantity inputs
const quantityInputs = document.querySelectorAll(".shopping-cart-item__quantity");

// Get all of the subtract buttons
const subtractButtons = document.querySelectorAll(".shopping-cart-item__button--subtract");


// Get all of the addition buttons // SE ÖVER NAMNEN! Add kan verka FÖRVIRRANDE
const addButtons = document.querySelectorAll(".shopping-cart-item__button--add");


// Get all add to cart buttons
const addToCartButtons = document.querySelectorAll(".button__add-to-cart");

const cartItemContainer = document.getElementsByClassName("shopping-cart__container");



/*====================================
Functions
=====================================*/
const deleteShoppingCartItem = (e) => {
  const buttonClicked = e.target;
  // Find the correct parent item (shopping-cart-item) and remove it
  buttonClicked.parentElement.parentElement.parentElement.remove();
  
  // Update the shopping cart total
  updateCartTotal();
} // End of function

const subtractItems = (e) => {
  const buttonClicked = e.target;
  // Get access to the quantity input
  let quantity = buttonClicked.nextElementSibling;

 // Subtract by one
  quantity.value --;

  // Make sure the input never goes below 0
  if (isNaN(quantity.value) || quantity.value <= 0) {
  quantity.value = 1;
  } 

  //Update cart
  updateCartTotal();
  console.log("Subtracted")
} // End of function

const addItems = (e) => {
  const buttonClicked = e.target;
  // Get access to the quantity input
  let quantity = buttonClicked.previousElementSibling;

  // Add by one
  quantity.value ++;
  
  // Update cart
  updateCartTotal();

  console.log("Added")
} // End of function

const updateCartTotal = () => {
  // Get the container for the cart items (shopping cart container), could also work with get element by id. Adding [0] after getElementsByClassName does the same thing, basically. 
  const cartItemContainer = document.getElementsByClassName("shopping-cart__container")[0];

  // Get all of the shopping cart items inside the container
  let cartItems = cartItemContainer.getElementsByClassName("shopping-cart-item");

  // Initialize the total price of the shopping cart items
  let total = 0

  // Initialize the discount for the shopping cart items
  let discount = 0;

  // Loop over the cartItems
  for (let i = 0; i < cartItems.length; i++) {
    let cartItem = cartItems [i];

    // Get the shopping cart item total cost element
    const priceElement = cartItem.getElementsByClassName("shopping-cart-item__total-price")[0];
 
    // Get the shopping cart quantity input
    const quantityElement = cartItem.getElementsByClassName("shopping-cart-item__quantity")[0];

    // Get the price from the price element, replace the currency text with no text, and parse the string to a float
    const price = parseFloat(priceElement.innerText.replace("SEK", ""));

    // Get the quantity for the item
    const quantity = quantityElement.value;

    // Update the total
    total = total + (price * quantity);
  } 

  // Round the total to nearest two decimal points
  total = Math.round(total * 100) / 100;

  // Get the shopping cart discount element and update it...........

  // Get the shopping cart content cost element and update it
  document.getElementsByClassName("shopping-cart-checkout__content")[0].children[1].innerText = `${total} SEK`;
  
  // Get the shopping cart total cost element and update it
  document.getElementsByClassName("shopping-cart-checkout__total-sum")[0].children[1].innerText = `${total - discount} SEK`;

  if (cartItemContainer.firstChild === undefined) {
    console.log("It's here but not really")
  } else {
    console.log("It's here")
  }
} // End of function


const addToCartClicked = (e) => {
  const button = e.target;
  // Get the parent element
  const shopItem = button.parentElement;
 
  // Get the name of the product
  const name = shopItem.getElementsByClassName("product-card__product-name")[0].innerText;
  
  // Get the price of the product
  const price = shopItem.getElementsByClassName("product-card__price")[0].innerText;
 
  // Get the image source
  const imageSrc = shopItem.getElementsByClassName("product-card__image")[0].src;
  console.log(name, price, imageSrc)
  // Add information to the addItemToCart function:
  addItemToCart(name, price, imageSrc)

  // Update the cart total
  updateCartTotal();
} // End of function


const addItemToCart = (name, price, imageSrc) => {
  // Create a shopping cart item
  const shoppingCartItem = document.createElement("div");
  shoppingCartItem.classList.add("shopping-cart-item")

  // Get access to the shopping cart container
  const shoppingCartContainer = document.getElementsByClassName("shopping-cart__container")[0];

  // Get the names of all shopping cart items
  let shoppingCartItemNames = shoppingCartContainer.getElementsByClassName("shopping-cart-item__name");

  // Check if the item already exists inside the shopping cart with loop
  for (let item of shoppingCartItemNames) {
    if (item.innerText == name) {
      alert("This item is already added to the cart")
      return; // ÄNDRA TILL IF ELLER SWITCH FÖR ATT ANTINGEN LÄGGA TILL EN NY ITEM, ELLER ADDERA QUANTITY INPUT MED 1
    }
  }

  // Create an HTML template and add the parameters
  const shoppingCartHtml = `
      <img src="${imageSrc}" alt="" class="shopping-cart-item__image">

      <div class="shopping-cart-item__information">
        <p class="shopping-cart-item__name">
          <a href="#">${name}</a>
        </p>
        <div class="shopping-cart-item__summary">
          <button class="shopping-cart-item__button shopping-cart-item__button--delete">Trash</button>
          <div class="shopping-cart-item__quantity-input">
            <button class="shopping-cart-item__button shopping-cart-item__button--subtract"> 
              - 
            </button>
            <input type="text" disabled="" value="1" class="shopping-cart-item__quantity">
            <button class="shopping-cart-item__button shopping-cart-item__button--add"> 
              + 
            </button>
          </div> <!-- End of item quantity input -->
          <p class="shopping-cart-item__total-price">${price}</p>
        </div> <!-- End of shopping cart summary -->

      </div> <!-- End of shopping cart item information -->
  `
  // Give the shopping cart item HTML
  shoppingCartItem.innerHTML = shoppingCartHtml;

  // Append the new shopping cart item to the end of the cart container
  shoppingCartContainer.append(shoppingCartItem);

  // Add event listeners to the newly created shopping cart items
  // Delete button
  shoppingCartItem.getElementsByClassName("shopping-cart-item__button--delete")[0].addEventListener("mouseup", deleteShoppingCartItem);

  // Subtract button
  shoppingCartItem.getElementsByClassName("shopping-cart-item__button--subtract")[0].addEventListener("mouseup", subtractItems);

  // Add button
  shoppingCartItem.getElementsByClassName("shopping-cart-item__button--add")[0].addEventListener("mouseup", addItems);
} // End of function

/* if (total === 0) {
  cartItemContainer.innerHTML = "<p>Tom varukorg</p>"
} else {
  
} */
/*==============================================================================
MAIN
==============================================================================*/
/*=========================================================
CAMPAIGN CAROUSEL (https://www.w3schools.com/w3css/w3css_slideshow.asp)
=========================================================*/
/*====================================
Global
=====================================*/
let cardIndex = 0;
const carouselContainer = document.getElementById("carousel__container");
const carouselNextButton = document.getElementById("indicator__next-button");
const carouselPrevbutton = document
  .getElementById("indicator__previous-button");
const indicatorNumber = document.getElementById("indicator__number");

/*====================================
Fetch 
=====================================*/
// Fetching the card data and working with it
fetch("scripts/carousel_cards.json")
  .then((response) => response.json())
  .then((cardCollection) => { 
    // Get the total numbers of cards, i.e. the length of the data object
    const totalCards = Object.keys(cardCollection).length;

    // Initialize the carousel indicator
    indicatorNumber.innerText = `${cardIndex + 1} / ${totalCards}`;

    // Initialize the first card from cardCollection
    cards(cardCollection);

    // Add event listeners to the next and previous buttons
    carouselPrevbutton.addEventListener("mousedown", moveToPreviousCard);
    carouselNextButton.addEventListener("mousedown", moveToNextCard);

    /* FUNCTIONS */
    // render the current card
    function cards () {
      carouselContainer.innerHTML =
      `
      <div class="product-card">
        <a href="${cardCollection[cardIndex].link} target="_blank" class="product-card__link">
          <img src="${cardCollection[cardIndex].image}" class="product-card__image">
        </a>
        
        <h3 class="product-card__product-name">
          ${cardCollection[cardIndex].product}
        </h3>

        <p class="product-card__description">
          ${cardCollection[cardIndex].description}
        </p>

        <p class="product-card__price">
          ${cardCollection[cardIndex].price} SEK
        </p>
        
        <div class="product-card__rating-container">
          <span class="product-card__star-rating margin-right">
          ${cardCollection[cardIndex].stars} <!-- Ändra till SVG -->
          </span>

          <span class="product-card__rating">
            ${cardCollection[cardIndex].rating}
          </span>

          <span class="product-card__reviews">
            (${cardCollection[cardIndex].reviews})
          </span>
      </div>


      <button class="button product-card__button button__add-to-cart">
        Lägg i varukorgen
      </button>
    </div> <!-- End of carousel product card -->
      `
      // Reference the buy "lägg i varukorgen" button. Everytime cards() is envoked, the button is updated.
      
      const buyButton = document.querySelector(".product-card__button");
      
      // Add event listener to the buy button - it's dynamic
     buyButton.addEventListener("mousedown", addToCartClicked);
    

    } /* End of cards */
    
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
    }
})


/*=========================================================
POPULAR CATEGORIES
=========================================================*/
/*====================================
Global
=====================================*/
const popularProdContainer = document.getElementById("product-cards__container--popular");

/*====================================
Fetch 
=====================================*/
let outsideFetch = ""
fetch("scripts/popular_prod_cards.json")
  .then(response => response.json())
  .then(data => {
    const popularProducts = data;
    const popularProductsLength = Object.keys(popularProducts).length;

    // Render cards
    for (const property in popularProducts) {
      /* popularProdContainer.innerHTML += popularProducts[property].price; */
      popularProdContainer.innerHTML += `
      <!-- Popular product card -->
      <div class="product-card product-card--popular"> 
        <a href="${popularProducts[property].link}" class="product-card__link">
          <img src="${popularProducts[property].image}" 
          alt="" 
          class="product-card__image product-card__image--popular">
        </a>

         <h3 class="product-card__product-name">
          ${popularProducts[property].product}
        </h3>

          <p class="product-card__description product-card__description--popular">
          ${popularProducts[property].description} 
          </p>

          <p class="product-card__price product-card__price--popular">
            ${popularProducts[property].price} SEK
          </p>

          <div class="product-card__rating-container product-card__rating-container--popular">
            <span class="product-card__star-rating product-card__star-rating--popular margin-right">
            ${popularProducts[property].stars} <!-- Ändra till SVG -->
            </span>
            
            <span class="product-card__rating product-card__rating--popular margin-right">
            ${popularProducts[property].rating}
            </span>

            <span class="product-card__reviews product-card__reviews--popular">
            ${popularProducts[property].reviews}
            </span>
          </div>

        <button class="button product-card__button product-card__button--popular button__add-to-cart">
          Lägg i varukorgen
        </button>
      </div> <!-- End of product card -->
      `
    } /* End of for in loop */

    // Select all of the buy buttons 
    const buyBtn = document.querySelectorAll(".product-card__button--popular");
    
    // Loop through the buttons and attach an event listener on each element https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class 
    buyBtn.forEach(button => button.addEventListener("mouseup", addToCartClicked))
  
  }) /* End of Fetch */
