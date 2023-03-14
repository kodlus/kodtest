"use strict";
const v = "Hi! I'm a strict mode script!";
/*============================================================================
IMPORTED DATA, VARIABLES, ETC. 
==============================================================================*/
import { shoppingCartItemHtml } from "./cards_html.js";

/*============================================================================
CONTENT
==============================================================================*/
// Used for deleting a shopping cart item created with addItemToCart
const deleteShoppingCartItem = (e) => {
  const buttonClicked = e.target;
  // Find the correct parent item (shopping-cart-item) and remove it
  buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
  
  // Update the shopping cart total
  updateCartTotal();
} // End of function

// Used for increasing the quantity of a shopping cart item created with addItemToCart
const subtractQuantity = (e) => {
  const buttonClicked = e.target;
  // Get access to the quantity input
  let quantity = buttonClicked.
  nextElementSibling;

 // Subtract by one
  quantity.value --;

  // Make sure the input never goes below 0
  if (isNaN(quantity.value) || quantity.value <= 0) {
  quantity.value = 1;
  } 

  //Update cart
  updateCartTotal();
} // End of function

// Used for decreasing the quantity of a shopping cart item created with addItemToCart
const increaseQuantity = (e) => {
  const buttonClicked = e.target;
  // Get access to the quantity input
  let quantity = buttonClicked
    .previousElementSibling // Label
    .previousElementSibling;  // quantity input

  // Increase by one
  quantity.value ++;
  
  // Update cart
  updateCartTotal();

} // End of function

// Used for updating the entire shopping cart
const updateCartTotal = () => {
  // Get the container for the cart items (shopping cart container), could also work with get element by id. Adding [0] after getElementsByClassName does the same thing, basically. 
  const cartItemContainer = document.getElementById("shopping-cart-inner__item-container")
 
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
  document.getElementsByClassName("shopping-cart-inner__items-sum")[0].children[1].innerText = `${total} SEK`;
  
  // Get the shopping cart total cost element and update it
  document.getElementsByClassName("shopping-cart-inner__items-total-sum")[0].children[1].innerText = `${total - discount} SEK`;

  // Get the shopping cart indicator and update it
  const shoppingCartIndicator = document.getElementById("shopping-cart-outer__quantity-indicator");

  console.log(cartItemContainer)


/*   Object.keys(popularProductsCards).length */


  if(cartItemContainer.childElementCount === 0) {
    shoppingCartIndicator.innerText = "0";
  
  } else {
    // Initialize an empty array holding quantity data for each shopping item
    let totalQuant = [];

    // check each item inside the container
    for (let i = 0; i < cartItems.length; i++) {
      
      // Get the item
      let cartItem = cartItems[i];
      
      // Get its value
      let value =cartItem.getElementsByClassName("shopping-cart-item__quantity")[0].value;
      console.log(value)

      // Convert value from string to integer
      value = parseInt(value, 10);

      // Push the new value to totalQuant. Remember, the value gets updated every time the increase or decrease button is pushed
      totalQuant.push(value);
    }
    
    // Reduce the array to a single integer 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce 
      const initialValue = 0;
      let sumWithInitial = totalQuant.reduce (
      (accumulator, currentValue) => accumulator + currentValue, initialValue);
      console.log(sumWithInitial);

      shoppingCartIndicator.innerText = sumWithInitial;
    }

  // Add or remove shopping cart message
  if (cartItemContainer.childElementCount === 0) {
    createMessage("shopping-cart-message", "shopping-cart-message");
  } else if (cartItemContainer.childElementCount > 0) {
    removeMessage("shopping-cart-message");
  }
} // End of function


const createMessage = (id, className) => {
  const message = document.createElement("p");
  message.setAttribute("id", `${id}`)
  message.setAttribute("class", `${className}`)
  message.innerText = "Din korg är tom :(";
  document.getElementById("shopping-cart-inner__item-container").appendChild(message);
}

const removeMessage = (id) => {
  const message = document.getElementById(`${id}`);
  // If the message is not null, remove it. If the message is null, i.e. the message does not exist, do nothing
  if (message !== null) {
    message.parentNode.removeChild(message)
  }
 }

// Used for collecting relevant data from items when buy button is clicked, and passes that information to addToCart
const addToCartClicked = (e) => {
  const button = e.target;
  // Get the parent element
  const shopItem = button.parentElement;
 
  // Get the name of the product
  const name = shopItem.getElementsByClassName("product-card__product-name")[0].innerText;
  
  // Get the ID of the product and keep the number at the end, which is related to the product's index
  const productIndex = Number(shopItem.id.slice(-1));
  
  console.log("This is productIndex")
  console.log(productIndex)

  // Get the product link and remove the characters "target=" from the string
  const productLink = shopItem.getElementsByClassName("product-card__link")[0].getAttribute("href").slice(0, -8);

  // Get the price of the product
  const price = shopItem.getElementsByClassName("product-card__price")[0].innerText;
 
  // Get the image source
  const imageSrc = shopItem.getElementsByClassName("product-card__image")[0].src;

  // Send information to the addItemToCart function:
  addItemToCart(name, price, imageSrc, productIndex, productLink)

  // Update the cart total
  updateCartTotal();
} // End of function

// This function is triggered when buy buttons are clicked, and creates an item element with the information from addToCartClicked. The item is placed in the shopping cart
const addItemToCart = (name, price, imageSrc, productIndex, productLink) => {
  // Create a shopping cart item
  const shoppingCartItem = document.createElement("div");
  shoppingCartItem.classList.add("shopping-cart-item")

  // Get access to the shopping cart container
  const shoppingCartContainer = document.getElementsByClassName("shopping-cart-inner__item-container")[0];

  // Get the names of all shopping cart items
  let shoppingCartItemNames = shoppingCartContainer.getElementsByClassName("shopping-cart-item__name");

  // Check if the item already exists inside the shopping cart with loop
  for (let item of shoppingCartItemNames) {
    if (item.innerText === name) {
      // If the item exists, update its value by 1. This long line represents the path to an item's quantity  indicator, which increments every time item duplicates are added to the shopping cart 
      item
        .nextElementSibling // shopping-cart-inner__item-container
        .children[2] // shopping-cart-item__quantity-input
        .children[2] //shopping-cart-item__quantity
        .value ++;
      
        console.log("Debug")
      console.log(item.nextElementSibling.children[2].children[1])
      // Break loop, otherwise a duplicate item gets created 
      return
    }
  }

  // Add the parameters to the imported utility function, generating shopping cart HTML
  const shoppingCartHtml = shoppingCartItemHtml(imageSrc, name, price, productIndex, productLink);
  // Apply the newly created shopping cart HTML to the shopping cart item div
  shoppingCartItem.innerHTML = shoppingCartHtml;
  // Append the new shopping cart item to the end of the cart container
  shoppingCartContainer.append(shoppingCartItem);

 

  // Add event listeners to the newly created shopping cart items
  // Delete button
  shoppingCartItem.getElementsByClassName("shopping-cart-item__delete-button")[0].addEventListener("mouseup", deleteShoppingCartItem);

  // Subtract button
  shoppingCartItem.getElementsByClassName("shopping-cart-item__button--subtract")[0].addEventListener("mouseup", subtractQuantity);

  // Increase button
  shoppingCartItem.getElementsByClassName("shopping-cart-item__button--add")[0].addEventListener("mouseup", increaseQuantity);
} // End of function

/*============================================================================
EXPORTED DATA
==============================================================================*/
export {
  deleteShoppingCartItem, 
  subtractQuantity,
  increaseQuantity,
  updateCartTotal,
  addToCartClicked,
  addItemToCart
}

/*============================================================================
RESOURCES
==============================================================================*/
// How to build a simple shopping cart, and generate shopping cart items by clicking on product cards https://youtu.be/YeFzkC2awTM?t=541
