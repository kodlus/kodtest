"use strict";
const v = "Hi! I'm a strict mode script!";
/*============================================================================
IMPORTED DATA, VARIABLES, ETC. 
==============================================================================*/

/*============================================================================
CONTENT
==============================================================================*/
// Used for deleting a shopping cart item created with addItemToCart
const deleteShoppingCartItem = (e) => {
  const buttonClicked = e.target;
  // Find the correct parent item (shopping-cart-item) and remove it
  buttonClicked.parentElement.parentElement.parentElement.remove();
  
  // Update the shopping cart total
  updateCartTotal();
} // End of function

// Used for increasing the quantity of a shopping cart item created with addItemToCart
const subtractQuantity = (e) => {
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
} // End of function

// Used for decreasing the quantity of a shopping cart item created with addItemToCart
const increaseQuantity = (e) => {
  const buttonClicked = e.target;
  // Get access to the quantity input
  let quantity = buttonClicked.previousElementSibling;

  // Increase by one
  quantity.value ++;
  
  // Update cart
  updateCartTotal();

} // End of function

// Used for updating the entire shopping cart
const updateCartTotal = () => {
  // Get the container for the cart items (shopping cart container), could also work with get element by id. Adding [0] after getElementsByClassName does the same thing, basically. 
  const cartItemContainer = document.getElementById("shopping-cart__container")
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









  console.log(cartItemContainer.childElementCount)

  const message = document.createElement("p");
  message.setAttribute("id", "strul")
  message.innerText = "Din korg är tom :(";
  if (cartItemContainer.childElementCount == 0) {
    cartItemContainer.appendChild(message);
  } else if (cartItemContainer.childElementCount > 0) {
    remove();
  }
} // End of function


function remove ()
 {
  const message = document.getElementById("strul");
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
  
  // Get the price of the product
  const price = shopItem.getElementsByClassName("product-card__price")[0].innerText;
 
  // Get the image source
  const imageSrc = shopItem.getElementsByClassName("product-card__image")[0].src;
  // Add information to the addItemToCart function:
  addItemToCart(name, price, imageSrc)

  // Update the cart total
  updateCartTotal();
} // End of function

// The function is triggered when buy buttons are clicked, and creates an item element with the information from addToCartClicked. The item is placed in the shopping cart
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
  shoppingCartItem.getElementsByClassName("shopping-cart-item__button--subtract")[0].addEventListener("mouseup", subtractQuantity);

  // Add button
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
