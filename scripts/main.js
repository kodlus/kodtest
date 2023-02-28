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
let cardIndex = 1;
const cardCollection = document.getElementsByClassName("carousel__product-card");
const carouselNextButton = document.getElementById("indicator__next-button");
const carouselPrevbutton = document.getElementById("indicator__previous-button");
const indicatorNumber = document.getElementById("indicator__number");
indicatorNumber.innerText = `${cardIndex} / ${cardCollection.length}`


const switchCard = (num) => {
  showCard(cardIndex += num)
}

const showCard = (num) => {
  let i;
  let cardCollection = document.getElementsByClassName("carousel__product-card");

  /* Reset the cardIndex if it goes past the # of items in cardCollection */
  if (num > cardCollection.length) {
    cardIndex = 1; 
  }

  /* Go to the last item if num gets smaller than 1 (loop back) */
  if (num < 1) {
    cardIndex = cardCollection.length;
  }

  for (i = 0; i < cardCollection.length; i++) {
    cardCollection[i].classList.add("is-hidden");
  }

  cardCollection[cardIndex - 1].classList.remove("is-hidden")
}

/* Shows the first card */
showCard(cardIndex);

carouselNextButton.addEventListener("click", () => {
  switchCard(+1);
  console.log(cardIndex)
  indicatorNumber.innerText = `${cardIndex} / ${cardCollection.length}`
});

carouselPrevbutton.addEventListener("click", () => {
  switchCard(-1);
  console.log(cardIndex)
  indicatorNumber.innerText = `${cardIndex} / ${cardCollection.length}`
})