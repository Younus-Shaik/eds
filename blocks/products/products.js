let productDiv;
let products;
export default async function decorate(block) {
    productDiv = block;
    productDiv.classList.add('product-container__cards')
    initializeProductList('https://dummyjson.com/products');
}

function loadProducts(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}

function loadProductHtml(products) {
    let productHTML = ``;
    // totalCount.innerText = products.products.length;
    products.products.map((product) => {
        productHTML += `
            <div class="product-card">
                <!-- Product Title -->
                <div class="product-card__title">${product.title}</div>
                
                <!-- Product Rating -->
                <div class="product-card__rating align-center" data-rating="${formatValues(product.rating, 1)}">
                    <span class="product-card__stars"></span>
                    <span class="product-card__rating-value">
                        ${formatValues(product.rating)} (${product.reviews.length})
                    </span>
                </div>
                
                <!-- Product Image -->
                <img class="product-card__image" src="${product.images[0]}" alt="${product.title}" />
                
                <!-- Product Bottom Section -->
                <div class="product-card__bottom">
                    <!-- Price -->
                    <div class="product-card__price">
                        ₹${formatValues(usdToInr(product.price), 0)}/- (${product.discountPercentage}% OFF)
                    </div>
                    <!-- Description -->
                    <div class="product-card__description">
                        ${product.description}
                    </div>
                </div>
                
                <!-- Buy Button -->
                <div class="product-card__button align-center">
                    <button class="product-card__btn-buy">Buy</button>
                </div>
            </div>
        `;
    });
    productDiv.innerHTML = productHTML;
    console.log(productDiv,productHTML);

    // Add event listeners to buy buttons
    // buyButton = bodyTag.querySelectorAll('.product-card__btn-buy');
    starFuctioning();

    // Show no results message if no products found
    if (products.products.length == 0) {
        productDiv.innerHTML = 
        `<div class="product-container__no-results">No products found</div>`;
        loadMore.style.display = 'none';
    }
}

function starFuctioning() {
    document.querySelectorAll('.product-card__rating').forEach(cardrating => {
        const rating = parseFloat(cardrating.dataset.rating);
        const starsElement = cardrating.querySelector('.product-card__stars');
        const starsWidth = (rating / 5) * 100;
        starsElement.style.setProperty('--stars-width', `${starsWidth}%`);
    });
}

function initializeProductList(url) {
    loadProducts(url).then((data) => {
        products = data;
        loadProductHtml(data);
    });
}

export function usdToInr(price) {
    return (price * 82)
}

export function formatValues(value,n) {
    return value.toFixed(n);
}