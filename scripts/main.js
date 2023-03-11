"use strict";
const v = "Hi! I'm a strict mode script!";

const cartItemContainer = document.getElementsByClassName("shopping-cart-inner__item-container"); 

import {updateCartTotal} from "/scripts/shopping_cart.js"
updateCartTotal()


/*============================================================================
HEADER
==============================================================================*/
/*=========================================================
TOGGLE MENUS
=========================================================*/
/*=========================================================
Global
=========================================================*/
const navButton = document.getElementById("header__nav-button");
console.log(navButton)
const headerNav = document.querySelector("#header__nav");
console.log(headerNav)
const shoppingCartButton = document.querySelector("#shopping-cart-outer__button");
console.log(shoppingCartButton)
const shoppingCart = document.querySelector("#shopping-cart-inner");
console.log(shoppingCart)
const shoppingCartDiv = document.querySelector(".shopping-cart-outer");
const closeButton = document.querySelector("#shopping-cart-inner__close-button")
console.log(closeButton)

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
  console.log(e)
  contentToggle(headerNav, shoppingCart);


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
https://www.w3schools.com/howto/howto_js_sticky_header.asp
=========================================================*/
// When the user scrolls the page, execute hideBanner
window.onscroll = function () { hideBanner()}

// Get the information banner
const informationBanner = document.getElementById("header__information-banner");

// Get the offset of the information banner
let offset = informationBanner.offsetTop;
console.log(offset)

// Add the is-visible class to the information banner when you reach its scroll position. Remove is-visible when you leave the scroll position
function hideBanner() {
  if (window.pageYOffset > offset){
    informationBanner.classList.add("is-hidden");
  } else {
    informationBanner.classList.remove("is-hidden")
  }
}

/*==============================================================================
MAIN
==============================================================================*/
/*=========================================================
CAMPAIGN CAROUSEL 
=========================================================*/
/*====================================
Load cards for the carousel cards &
make the carousel interactive
=====================================*/
import loadCarousel from "./carousel.js";
loadCarousel()

/*=========================================================
POPULAR CATEGORIES
=========================================================*/
import loadPopularProducts from "./popular_products.js";
loadPopularProducts()
