"use strict";
const v = "Hi! I'm a strict mode script!";

const cartItemContainer = document.getElementsByClassName("shopping-cart__container"); 

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
