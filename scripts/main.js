"use strict";
const v = "Hi! I'm a strict mode script!";
 /*============================================================================
TODO
==============================================================================*/
// TODO: Skapa en massa funktioner från koden jag har
// TODO: Ta bort eventlisteners vid resize
// TODO: Ordna en tydlig struktur

/*=============================================================================
IMPORTED DATA
==============================================================================*/
import {updateCartTotal} from "/scripts/shopping_cart.js"
import loadCarousel from "./carousel.js";
import loadPopularProducts from "./popular_products.js";
import { deleteShoppingCartItem } from "./shopping_cart.js";

/*=============================================================================
GLOBAL
==============================================================================*/
/*=========================================================
DOM
=========================================================*/
const navButton = document.getElementById("nav-toggle-button");
const headerNav = document.querySelector("#nav");
const shoppingCartButton = document.querySelector("#shopping-cart-outer__button");
const shoppingCart = document.querySelector("#shopping-cart-inner");
const shoppingCartCloseButton = document.querySelector("#shopping-cart-inner__close-button")
const headerSearchBar = document.getElementById("header__searchbar");
const revealSearchFieldButton = document.getElementById("header__reveal-search-button");
const dropDownButtons = document.getElementsByClassName("nav__dropdown-button");
const screenWidth = document.documentElement.clientWidth || window.innerWidth;
const informationBanner = document.getElementById("header__row-2");


/*=========================================================
Measurements
=========================================================*/
const smallScreenSize = 350;
const smallMediumScreenSize = 501;
const mediumLargeScreenSize = 801;
const largeScreenSize = 1201;
let informationBannerOffset = informationBanner.offsetTop;
let headerSearchBarOffset = headerSearchBar.offsetTop;



/*=============================================================================
INTERACTIONS
==============================================================================*/
/*=========================================================
Utility functions
=========================================================*/
function contentToggle(element1, element2) {
  // If element1 contains the class "is-not-visible", remove it, and add it to element2. If element1 does not contain "is-not-visible", add it to element1
  if (element1.classList.contains("is-not-visible")) {
      element1.classList.remove("is-not-visible");
      element2.classList.add("is-not-visible");
  } else {
    element1.classList.add("is-not-visible");
  }
}

// Checks if a node is a child of an element. Returns true or false
// https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
function isAChildOf (node, parent) {
  return (node === parent) ? false: parent.contains(node)
}

// The function adds the "is-not-visible" utility class if the window's vertical offset is larger than the element's offset
function hideBanner() {
  if (window.pageYOffset > informationBannerOffset){
    informationBanner.classList.add("is-not-visible");
  } else {
    informationBanner.classList.remove("is-not-visible")
  } 
}

function hideSearchBar() {
  if (window.pageYOffset > headerSearchBarOffset){
    revealSearchFieldButton.classList.remove("is-not-visible");
    headerSearchBar.classList.add("is-not-visible");
  } else {
    revealSearchFieldButton.classList.add("is-not-visible")
    headerSearchBar.classList.remove("is-not-visible");
  } 
}

// The function takes in three parameters: screen size (integer), event type (string), and a function. If the screen width matches or is less to the size, an event listener defined by the event type and function will be hooked to the window object. If the screen size is larger than the size, the event listener gets removed
function screenEvent (size, eventType, func) {
  // Get the screen width
  let width = document.documentElement.clientWidth || window.innerWidth;

  if (width <= size) {
    window.addEventListener(eventType, func, true)
  } else if (width > size) {
    window.removeEventListener(eventType, func, true);
  }
}
/*=========================================================
Menu toggling
=========================================================*/
/*===================================
Toggle navigation
====================================*/
navButton.addEventListener("click", (e) => {
  contentToggle(headerNav, shoppingCart);
});

/*===================================
Toggle and close shopping cart
====================================*/
// Toggle the shopping cart when clicking on the shopping cart button
shoppingCartButton.addEventListener("click", () => {
  // If the screen size is smaller than large screen sizes, toggle the shopping cart
  if(window.innerWidth < largeScreenSize) { //TODO: se över förklaring
      contentToggle(shoppingCart, headerNav);
      // If the screen size is large, remove the "is-not-visible" utility class from the shopping cart
  } else {
    shoppingCart.classList.remove("is-not-visible")
  }

  // Stop the body element from scrolling when the shopping cart is visible
  document.body.classList.add("stop-scrolling")
  // Make the overlay visible
  document.getElementsByClassName("overlay")[0].style.display = "block";
});

// Close shopping cart when the close button is clicked
shoppingCartCloseButton.addEventListener("click", () => {
  shoppingCart.classList.add("is-not-visible");
  // Enable the body to scroll
  document.body.classList.remove("stop-scrolling");
  // Remove overlay
  document.getElementsByClassName("overlay")[0].style.display = "none";
})

/*===================================
Close menus on click
====================================*/
const closeMenusWhenClickingOutside = (e) => {
  let node = e.target;
  
  // Closes the shopping cart if the users clicks outside it. If the node is a child of shoppingCart, and contains the class shopping-cart-outer__button, nothing happens (otherwise the shopping-cart-outer__button would not work)
  if (isAChildOf(node, shoppingCart) !== true && node.classList.contains("shopping-cart-outer__button") !== true){
    // Hide shopping cart when clicking outside the shopping cart
    shoppingCart.classList.add("is-not-visible")

    // Enable the body to scroll, if unable
    document.body.classList.remove("stop-scrolling")

    // Remove overlay, if enabled
    document.getElementsByClassName("overlay")[0].style.display = "none";
    console.log("Close")
  }

  // Closes the headerNav if the user clicks outside it. If the node is a child of headerNav, and contains the class button, nothing happens. Only works for large screens 
  if (window.innerWidth <= largeScreenSize) {
    if (isAChildOf(node, headerNav) !== true && e.target.classList.contains("nav-toggle-button") !== true ) {
    headerNav.classList.add("is-not-visible") }
  }
    
  // Resetting the nav
  if(headerNav.classList.contains("is-not-visible")) {
    for (let i = 0; i < dropDownButtons.length; i++) {
      dropDownButtons[i]. innerText ="+";
      dropDownButtons[i]
      .parentElement
      .nextElementSibling
      .classList.add("is-not-visible");
    }
  }

  // Close searchbar if user clicks outside it, only works for medium/large screens and smaller
  if(window.innerWidth <= mediumLargeScreenSize) {
    if (isAChildOf(node, headerSearchBar) !== true && node.id !== "header__reveal-search-button") {
      headerSearchBar.classList.add("is-not-visible");
      revealSearchFieldButton.classList.remove("is-not-visible")
    }
  }
} 

// Hook event listener to the document, with the above function ready to go
document.addEventListener("click", closeMenusWhenClickingOutside);

/*===================================
Toggling nav-dropdown menus and
closing the nav
====================================*/
// Hook one eventlistener to the whole nav element
headerNav.addEventListener("click", (e) => {
  const targetButton = e.target.closest("button");
 
  // Remove warning messages if target button is null
  if (targetButton === null || targetButton.id === "nav__close-button") {
    return;
  }

  // Check if target button has the plus sign and is of the right class. If true open the dropdown, else close the dropdown
  if (targetButton.innerText === "+" && targetButton.classList.contains("nav__dropdown-button")) {
    targetButton.innerText = "-";
    targetButton
      .parentElement
      .nextElementSibling
      .classList.remove("is-not-visible");

  } else {
    targetButton.innerText = "+";
    targetButton
      .parentElement
      .nextElementSibling
      .classList.add("is-not-visible");
  }

  // Close open dropdown when opening a new (toggle)
  if (targetButton) {
    for (let i = 0; i < dropDownButtons.length; i++) {
      if (dropDownButtons[i] !== targetButton) {
        dropDownButtons[i].innerText ="+";
        dropDownButtons[i]
        .parentElement
        .nextElementSibling
        .classList.add("is-not-visible");
      }
    }
  }
}) // End of header nav eventlistener

// Close nav when button pushed
document.getElementById("nav__close-button").addEventListener("click", () => {
  headerNav.classList.add("is-not-visible");
})

/*=========================================================
Window resize events
=========================================================*/
// Hook event listener to the window which detects screen size changes
window.addEventListener("resize", () => {
  // Hide information banner when scrolling, only for medium / large screens and smaller
  screenEvent(mediumLargeScreenSize , "scroll", hideBanner);
  // Hide searchbar when scrolling, only for medium / large screens and smaller
  screenEvent(mediumLargeScreenSize , "scroll", hideSearchBar)

  // Remove the is-not-visible class if the information banner is hidden when transitioning from small screen to larger screen
  informationBanner.classList.remove("is-not-visible");
  
  // Remove the is-not-visible class if the searchbar is hidden when transitioning from small screen to larger screen
  if (window.innerWidth >= mediumLargeScreenSize && document.getElementById("header__searchbar").classList.contains("is-not-visible")) {
    document.getElementById("header__searchbar").classList.remove("is-not-visible")
  }

  // Make the nav visible by default on large screens
  if (window.innerWidth >= largeScreenSize) {
    document.getElementById("nav").classList.remove("is-not-visible");
  } else {
    document.getElementById("nav").classList.add("is-not-visible");
  }

  // Make the nav-links interactive ("hover"-effect) on large screens
  hoverOverNavLinks();
})

/*=========================================================
Nav-link hover (only large screens)
=========================================================*/
function hoverOverNavLinks() {
  // Make the nav visible on load
  nav.classList.remove("is-not-visible")
  
  // Select all nav-links
  const links = document.querySelectorAll(".nav__link");  
  
  // Make the function only trigger on large screens
  if (window.innerWidth >= largeScreenSize) {

    // Select all nav-link dropdowns
    const linkDropDowns = document.querySelectorAll(".nav__dropdown");

    // Function with eventlistener removal. When mouse leaves the nav, make all dropdowns invisible
    function myLeave() {
      for(let dropdown of linkDropDowns) {
        dropdown.classList.add("is-not-visible");
      } 
      
      if (window.innerWidth < largeScreenSize) {
        nav.removeEventListener("mouseleave", myLeave);
      }
    }
    // Hook eventlistener to the nav with the function above ready to go
    nav.addEventListener("mouseleave", myLeave);

    // Hook eventlisteners to the nav links:
    // Loop through the nav links
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      // Hook event listers to each nav-link
      link.addEventListener("mouseenter",  function listenerFunction() {
        // If the screen size is smaller than large screen sizes, remove eventlisteners. Else, add eventlisteners
        if (window.innerWidth < largeScreenSize) {
          nav.removeEventListener("mouseleave", listenerFunction)
        } else {
        // Hovering over nav-link reveals its related dropdown-menu
        link.children[1].classList.remove("is-not-visible");
  
        // Hovering over a nav-link will hide other nav-link dropdowns
        switch (link) {
          // When hovering over the first link:
          case links[0]: 
            links[1].children[1].classList.add("is-not-visible");
            links[2].children[1].classList.add("is-not-visible");
            break;
            // When hovering over the second link:
          case links[1]:
            links[2].children[1].classList.add("is-not-visible");
            links[0].children[1].classList.add("is-not-visible");
            break;
            // When hovering over the third link:
          case links[2]:
            links[0].children[1].classList.add("is-not-visible");
            links[1].children[1].classList.add("is-not-visible");
          default:
            break;
          } 
        }
      });
    } // End of For loop  
  } // End of if-statement  
} // End of function

/*=========================================================
Hide searchbar on click
(only on screens smaller than medium / large)
=========================================================*/
revealSearchFieldButton.addEventListener("click", ()=> {
  headerSearchBar.classList.remove("is-not-visible");
  revealSearchFieldButton.classList.add("is-not-visible");
})

/*=========================================================
Call functions at run time
=========================================================*/
const onload = () => {
  updateCartTotal();
  loadCarousel();
  loadPopularProducts();
  screenEvent(mediumLargeScreenSize, "scroll", hideBanner);
  screenEvent(mediumLargeScreenSize, "scroll", hideSearchBar);
  hoverOverNavLinks();
}

onload();


/*=============================================================================
REFERENCES
==============================================================================*/
/* Hide information banner on scroll, only on small screens
https://www.w3schools.com/howto/howto_js_sticky_header.asp
https://www.satollo.net/execute-conditional-javascript-by-screen-size
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener */


/*=============================================================================
JUNK
==============================================================================*/

