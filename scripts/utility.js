function shoppingCartItemHtml (imageSrc, name, price) {
  return `<img src="${imageSrc}" alt="" class="shopping-cart-item__image">

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
 }

function carouselCardHtml (data, cardIndex) {
  return       `
  <div class="product-card">
    <a href="${data[cardIndex].link} target="_blank" class="product-card__link">
      <img src="${data[cardIndex].image}" class="product-card__image">
    </a>
    
    <h3 class="product-card__product-name">
      ${data[cardIndex].product}
    </h3>

    <p class="product-card__description">
      ${data[cardIndex].description}
    </p>

    <p class="product-card__price">
      ${data[cardIndex].price} SEK
    </p>
    
    <div class="product-card__rating-container">
      <span class="product-card__star-rating margin-right">
      ${data[cardIndex].stars} <!-- Ändra till SVG -->
      </span>

      <span class="product-card__rating">
        ${data[cardIndex].rating}
      </span>

      <span class="product-card__reviews">
        (${data[cardIndex].reviews})
      </span>
  </div>

  <button class="button product-card__button button__add-to-cart">
    Lägg i varukorgen
  </button>
</div> <!-- End of carousel product card -->
  `
}

function popularProductCardHtml (data, property) {
  return `
  <!-- Popular product card -->
  <div class="product-card product-card--popular"> 
    <a href="${data[property].link}" class="product-card__link">
      <img src="${data[property].image}" 
      alt="" 
      class="product-card__image product-card__image--popular">
    </a>

     <h3 class="product-card__product-name">
      ${data[property].product}
    </h3>

      <p class="product-card__description product-card__description--popular">
      ${data[property].description} 
      </p>

      <p class="product-card__price product-card__price--popular">
        ${data[property].price} SEK
      </p>

      <div class="product-card__rating-container product-card__rating-container--popular">
        <span class="product-card__star-rating product-card__star-rating--popular margin-right">
        ${data[property].stars} <!-- Ändra till SVG -->
        </span>
        
        <span class="product-card__rating product-card__rating--popular margin-right">
        ${data[property].rating}
        </span>

        <span class="product-card__reviews product-card__reviews--popular">
        ${data[property].reviews}
        </span>
      </div>

    <button class="button product-card__button product-card__button--popular button__add-to-cart">
      Lägg i varukorgen
    </button>
  </div> <!-- End of product card -->
  `
}
 /*============================================================================
EXPORTED DATA
==============================================================================*/
 export {
  shoppingCartItemHtml,
  carouselCardHtml,
  popularProductCardHtml
}