"use strict";
const v = "Hi! I'm a strict mode script!";

 /*============================================================================
IMPORTED DATA
==============================================================================*/
import {updateCartTotal} from "/scripts/shopping_cart.js"
updateCartTotal()

/*============================================================================
HEADER
==============================================================================*/
/*=========================================================
TOGGLE MENUS
=========================================================*/
/*=========================================================
Global variables
=========================================================*/
const navButton = document.getElementById("nav-toggle-button");

const headerNav = document.querySelector("#nav");

const shoppingCartButton = document.querySelector("#shopping-cart-outer__button");

const shoppingCart = document.querySelector("#shopping-cart-inner");


const closeButton = document.querySelector("#shopping-cart-inner__close-button")


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
Toggle navigation
=========================================================*/
/* Toggle the navigation on or off */
navButton.addEventListener("click", (e) => {
  console.log(e)
  contentToggle(headerNav, shoppingCart);


});

/*=========================================================
Toggle shopping cart
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
Hide information banner on scroll, only on small screens
https://www.w3schools.com/howto/howto_js_sticky_header.asp
https://www.satollo.net/execute-conditional-javascript-by-screen-size
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
=========================================================*/
// Get the information banner
 const informationBanner = document.getElementById("header__information-banner");

// Get the offset of the information banner
let informationBannerOffset = informationBanner.offsetTop;

// The function adds the "is-hidden" utility class if the window's vertical offset is larger than the element's offset
function hideBanner () {
  if (window.pageYOffset > informationBannerOffset){
    informationBanner.classList.add("is-hidden");
  } else {
    informationBanner.classList.remove("is-hidden")
  } 
}

// The function takes in three parameters: screen size (integer), event type (string), and a function. If the screen width matches or is less to the size, an event listener defined by the event type and function will be hooked to the window object. If the screen size is larger than the size, the event listener gets removed
function smallScreenOnlyEvent (size, eventType, func) {
  // Get the screen width
  let width = document.documentElement.clientWidth || window.innerWidth

  if (width <= size) {
    window.addEventListener(eventType, func, true)
  } else  {
    window.removeEventListener(eventType, func, true);
  }
}

// Call smallScreenOnlyEvent at run time
smallScreenOnlyEvent(500, "scroll", hideBanner)

// Detect when the screen size changes, and call smallScreenOnlyEvent
window.addEventListener("resize", () => {
  smallScreenOnlyEvent(500, "scroll", hideBanner);

  // Remove the is-hidden class if the banner is hidden when transitioning from small screen to larger screen
  informationBanner.classList.remove("is-hidden")
})

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
