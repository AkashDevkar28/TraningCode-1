var productsContainer = document.getElementById("products");
var cartCount = document.getElementById("cart-count");
var cartItems = document.getElementById("cart-items");
var cart = [];
fetch("https://fakestoreapi.com/products")
    .then(function (response) { return response.json(); })
    .then(function (products) {
    products.forEach(function (product) {
        var productCard = document.createElement("div");
        productCard.classList.add("card");
        productCard.innerHTML = "\n                <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\">\n                <h3>").concat(product.title, "</h3>\n                <p>$").concat(product.price, "</p>\n                <button onclick=\"addToCart(").concat(product.id, ", '").concat(product.title, "', ").concat(product.price, ", '").concat(product.image, "')\">Add to Cart</button>\n            ");
        productsContainer.appendChild(productCard);
    });
});
function addToCart(id, title, price, image) {
    cart.push({ id: id, title: title, price: price, image: image });
    updateCart();
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
function updateCart() {
    cartItems.innerHTML = "";
    cart.forEach(function (item, index) {
        var li = document.createElement("li");
        li.innerHTML = "\n            ".concat(item.title, " - $").concat(item.price, "\n            <button onclick=\"removeFromCart(").concat(index, ")\">Remove</button>\n        ");
        cartItems.appendChild(li);
    });
    cartCount.textContent = cart.length.toString();
}
