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

const headerSearchBar = document.getElementById("header__searchbar");

const searchButton = document.getElementById("header__reveal-search-button");
/*=========================================================
Functions
=========================================================*/
const contentToggle= (element1, element2) => {
  // if the the element contains the class "is-not-visible", remove it, else add it
  if (element1.classList.contains("is-not-visible")) {
      element1.classList.remove("is-not-visible");
      element2.classList.add("is-not-visible");
  } else {
    element1.classList.add("is-not-visible");
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

  // Stop the body element from scrolling
  document.body.classList.add("stop-scrolling")

  document.getElementsByClassName("overlay")[0].style.display = "block";
});

/*=========================================================
Close/ open menus
=========================================================*/
closeButton.addEventListener("click", () => {
  shoppingCart.classList.add("is-not-visible");

  // Enable the body to scroll
  document.body.classList.remove("stop-scrolling");

  // Remove overlay
  document.getElementsByClassName("overlay")[0].style.display = "none";
})

const closeMenusWhenClickingOutside = (e) => {
  let node = e.target;
  
  // Closes the shopping cart if the users clicks outside it. If the node is a child of shoppingCart, and contains the class shopping-cart-inner__close-button, nothing happens 
  if (isAChildOf(node, shoppingCart) !== true && node.classList.contains("shopping-cart-outer__button") !== true){

   shoppingCart.classList.add("is-not-visible")

    // Enable the body to scroll
    document.body.classList.remove("stop-scrolling")

    // Remove overlay
    document.getElementsByClassName("overlay")[0].style.display = "none";
    console.log("Close")

  } 
  
  // Closes the headerNav if the user clicks outside it. If the node is a child of headerNav, and contains the class button, nothing happens
  if (isAChildOf(node, headerNav) !== true && e.target.classList.contains("nav-toggle-button") !== true ) {
      headerNav.classList.add("is-not-visible") }


    // Resetting the nav
    const dropDownButtons = document.getElementsByClassName("nav__dropdown-button");

    if(headerNav.classList.contains("is-not-visible")) {
      for (let i = 0; i < dropDownButtons.length; i++) {
        dropDownButtons[i]. innerText ="+";
        dropDownButtons[i]
        .parentElement
        .nextElementSibling
        .classList.add("is-not-visible");
      }
    }

  // Close searchbar if user clicks outside it, only for small screens
  if(window.innerWidth <= 800) {
      if (isAChildOf(node, headerSearchBar) !== true && node.id !== "header__reveal-search-button") {
      headerSearchBar.classList.add("is-not-visible");
      searchButton.classList.remove("is-not-visible")
    }
  }
}

// Hook event listener to the document and invoke the function
document.addEventListener("click", closeMenusWhenClickingOutside)

// NAV DROPDOWN MENU 
// Select the nav container
const nav = document.querySelector(".nav");
// Add event listener to the nav element
nav.addEventListener("click", (e) => {
  // Capture when the event
  const targetButton = e.target.closest("button");
 
  // Remove warning messages if target button is null
  if (targetButton === null || targetButton.id === "nav__close-button") {
    return
  }

  
  // Check if the button has the right inner text and is of the right class. Toggling 
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


  // Toggle dropdown menus
  const dropDownButtons = document.getElementsByClassName("nav__dropdown-button");

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
  })

  // Close nav when button pushed
  document.getElementById("nav__close-button").addEventListener("click", () => {
    document.getElementById("nav").classList.add("is-not-visible")
  })


/*=========================================================
Hide information banner on scroll, only on small screens
https://www.w3schools.com/howto/howto_js_sticky_header.asp
https://www.satollo.net/execute-conditional-javascript-by-screen-size
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
=========================================================*/
// Get the information banner
 const informationBanner = document.getElementById("header__row-2");

// Get the offset of the information banner
let informationBannerOffset = informationBanner.offsetTop;

// Set the screen small screen width variable. The number represents pixels
const smallScreenWidth = 800;

// The function adds the "is-not-visible" utility class if the window's vertical offset is larger than the element's offset
function hideBanner () {
  if (window.pageYOffset > informationBannerOffset){
    informationBanner.classList.add("is-not-visible");
  } else {
    informationBanner.classList.remove("is-not-visible")
  } 
}

// TODO: Fixa så att om klickar utanför och gömmer searchbar när offset är mindre, så sker inget
function hideSearchBar () {
  if (window.pageYOffset > headerSearchBarOffset){
    searchButton.classList.remove("is-not-visible");
    headerSearchBar.classList.add("is-not-visible");
  } else {
    searchButton.classList.add("is-not-visible")
    headerSearchBar.classList.remove("is-not-visible");
  } 
}








// The function takes in three parameters: screen size (integer), event type (string), and a function. If the screen width matches or is less to the size, an event listener defined by the event type and function will be hooked to the window object. If the screen size is larger than the size, the event listener gets removed
function screenEvent (size, eventType, func) {
  // Get the screen width
  let width = document.documentElement.clientWidth || window.innerWidth

  if (width <= size) {
    window.addEventListener(eventType, func, true)
  } else  {
    window.removeEventListener(eventType, func, true);
  }
}

// Call screenEvent at run time
screenEvent(smallScreenWidth, "scroll", hideBanner);
screenEvent(smallScreenWidth, "scroll", hideSearchBar)
// TODO: Skapa en screen event för nav close button


// Detect when the screen size changes, and call screenEvent
window.addEventListener("resize", () => {
  screenEvent(smallScreenWidth, "scroll", hideBanner);
  screenEvent(smallScreenWidth, "scroll", hideSearchBar)

  // Remove the is-not-visible class if the banner is hidden when transitioning from small screen to larger screen
  informationBanner.classList.remove("is-not-visible");
  
  // Remove the is-not-visible class if the search bar is hidden when transitioning from small screen to larger screen
  if (window.innerWidth >= 800 && document.getElementById("header__searchbar").classList.contains("is-not-visible")) {
    document.getElementById("header__searchbar").classList.remove("is-not-visible")
  }
  
})

/* function hover(element, enter, leave) {
  element.addEventListener("mouseenter", enter);
  element.addEventListener("mouseleave", leave);
} 


  const links = document.querySelectorAll(".nav__link");

// Hovering over nav links
function hoverOverNavLinks() {

  if (window.innerWidth > 800) {
  for (let i = 0; i < links.length - 2; i++) {
    let link = links[i];
    
    link.addEventListener("mouseenter", (e)=> {
      link.style.height = "100%";
      add(e);
    });

    link.addEventListener("mouseleave", (e) => {
      remove(e);
      link.style.height = "auto"
    })
    console.log(link.parentElement)
    }
      } else { //Get rid of unnecessary event listeners
        for (let i = 0; i < links.length - 2; i++) {
        let link = links[i];
        link.removeEventListener("mouseenter", add);
        link.removeEventListener("mouseleave", remove) 
    }
  } 
}

  

function add(e) {

  e.target.children[1].classList.remove("is-not-visible");

}

function remove(e) {

  e.target.children[1].classList.add("is-not-visible");
}

hoverOverNavLinks() */


// SEARCH BAR - mobile & tablet
let headerSearchBarOffset = headerSearchBar.offsetTop;




// TODO: CALCULATE THE OFFSET ON LOAD
// TODO: EXCEPTION WHEN CLICKING ON STUFF BUT THE PAGE HAS NOT SCROLLED

  // Hide the search button when pressed
searchButton.addEventListener("click", ()=> {
  console.log("clicked")
  headerSearchBar.classList.remove("is-not-visible");
  searchButton.classList.add("is-not-visible");
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
import { deleteShoppingCartItem } from "./shopping_cart.js";
loadPopularProducts()
