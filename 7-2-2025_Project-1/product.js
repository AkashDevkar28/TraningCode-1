
const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cart-items');
const clearCartButton = document.getElementById('clear-cart');
const apiUrl = "https://fakestoreapi.com/products"; 

let cart = [];


function fetchProducts() {
  axios.get(apiUrl)
    .then(response => {
      const products = response.data;
      displayProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
}


function displayProducts(products) {
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-4', 'mb-4');
    productCard.innerHTML = `
      <div class="card product-card">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body product-card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$${product.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(productCard);
  });
}


function addToCart(productId) {
  axios.get(`${apiUrl}/${productId}`)
    .then(response => {
      const product = response.data;
      cart.push(product);
      displayCart();
      alert(`${product.title} has been added to the cart!`);
    })
    .catch(error => console.error('Error adding product to cart:', error));
}


function displayCart() {
  cartItemsContainer.innerHTML = '';
  cart.forEach((product, index) => {
    const cartItem = document.createElement('li');
    cartItem.classList.add('list-group-item');
    cartItem.innerHTML = `
      ${product.title} - $${product.price}
      <button class="btn btn-warning btn-sm float-end" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}


function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
  alert('Item removed from cart');
}


clearCartButton.addEventListener('click', () => {
  cart = [];
  displayCart();
  alert('Cart cleared!');
});



fetchProducts();
