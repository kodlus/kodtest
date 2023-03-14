function shoppingCartItemHtml (imageSrc, name, price, productIndex, productLink) {
  return `<img src="${imageSrc}" alt="" class="shopping-cart-item__image">

  <div class="shopping-cart-item__information">
    <p class="shopping-cart-item__name">
      <a href="${productLink}">${name}</a>
    </p>
    <div class="shopping-cart-item__summary">
      
      <label for="shopping-cart-item__delete-button-${productIndex}"></label>
      <button id="shopping-cart-item__delete-button-${productIndex}" class="button shopping-cart-item__delete-button" aria-label="Ta bort alla exemplar av ${name} från din varukorg">
        <img src="/images/icons/icons8-trash-can-48.png" alt="remove item from the shopping cart icon" class="shopping-cart-item__button-icon"/>
      </button>
      
      <div class="shopping-cart-item__quantity-input">
        
        <label for="shopping-cart-item__button--subtract-${productIndex}"></label>
        <button id=""shopping-cart-item__button--subtract-${productIndex}" class="shopping-cart-item__button shopping-cart-item__button--subtract" aria-label="Reducera antalet ${name} i din varukorg"> 
          - 
        </button>

        <input type="text" disabled="" value="1" class="shopping-cart-item__quantity" aria-label="Antal exemplar av ${name}">
        
        <label for="shopping-cart-item__button--add-${productIndex}"></label>
        <button id="shopping-cart-item__button--add-${productIndex}" class="shopping-cart-item__button shopping-cart-item__button--add" aria-label="Öka antalet ${name} i din varukorg"> 
          + 
        </button>
      </div> <!-- End of item quantity input -->
      <p class="shopping-cart-item__total-price">${price}</p>
    </div> <!-- End of shopping cart summary -->

  </div> <!-- End of shopping cart item information -->
  `
 }

function carouselCardHtml (data, property) {
  return `
  <div id="carousel-card-${data[property].index}" class="product-card">
    <a href="${data[property].link} 
    target="_blank" 
    class="product-card__link" 
    aria-label="Läs mer om ${data[property].product}">
      <img src="${data[property].image}" 
      class="product-card__image 
      alt="${data[property].altText}"
      aria-label="${data[property].altText}">
    </a>
    
    <h3 class="product-card__product-name">
      ${data[property].product}
    </h3>

    <p class="product-card__description">
      ${data[property].description}
    </p>

    <p class="product-card__price">
      ${data[property].price} SEK
    </p>
    
    <div class="product-card__rating-container">
      <span class="product-card__star-rating margin-right">
      ${data[property].stars} <!-- Ändra till SVG -->
      </span>

      <span class="product-card__rating">
        ${data[property].rating}
      </span>

      <span class="product-card__reviews">
        (${data[property].reviews})
      </span>
  </div>

  <label for="product-card__button-${data[property].index}"></label>
  <button id="product-card__button-${data[property].index}" class="button product-card__button button__add-to-cart" aria-label="Lägg produkten i din varukorg">
    Lägg i varukorgen
  </button>
</div> <!-- End of carousel product card -->
  `
}

function popularProductCardHtml (data, property) {
  return `
  <!-- Popular product card -->
  <div id="popular-card-${data[property].index}"class="product-card product-card--popular"> 
    <a href="${data[property].link}" 
    class="product-card__link" 
    aria-label="Läs mer om ${data[property].product}">
      <img src="${data[property].image}" 
      alt="${data[property].altText}" 
      aria-label="${data[property].altText}"
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

    <button id="product-card__button--popular-${data[property].index}" class="button product-card__button product-card__button--popular button__add-to-cart" aria-label="Lägg produkten i din varukorg">
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