var adminProductsContainer = document.getElementById("admin-products");
// Fetch and display products in a grid layout
fetch("https://fakestoreapi.com/products")
    .then(function (response) { return response.json(); })
    .then(function (products) {
    products.forEach(function (product) {
        var productCard = document.createElement("div");
        productCard.classList.add("col-md-4", "mb-4"); // Bootstrap grid for 3 columns per row
        productCard.innerHTML = "\n                <div class=\"card h-100 shadow-sm\">\n                    <img src=\"".concat(product.image, "\" class=\"card-img-top img-fluid p-3\" alt=\"").concat(product.title, "\">\n                    <div class=\"card-body d-flex flex-column\">\n                        <h5 class=\"card-title text-truncate\">").concat(product.title, "</h5>\n                        <p class=\"card-text fw-bold text-success\">$<span id=\"price-").concat(product.id, "\">").concat(product.price.toFixed(2), "</span></p>\n                        <input type=\"text\" id=\"title-input-").concat(product.id, "\" class=\"form-control mb-2\" placeholder=\"New Title\">\n                        <input type=\"number\" id=\"price-input-").concat(product.id, "\" class=\"form-control mb-2\" placeholder=\"New Price\">\n                        <div class=\"mt-auto\">\n                            <button class=\"btn btn-warning btn-sm me-2 w-100\" onclick=\"updateProduct(").concat(product.id, ")\">Update</button>\n                            <button class=\"btn btn-danger btn-sm w-100 mt-2\" onclick=\"deleteProduct(").concat(product.id, ")\">Delete</button>\n                        </div>\n                    </div>\n                </div>\n            ");
        adminProductsContainer.appendChild(productCard);
    });
})
    .catch(function (error) { return console.error("Error fetching products:", error); });
// PATCH: Update product title and price
function updateProduct(productId) {
    var titleInput = document.getElementById("title-input-".concat(productId));
    var priceInput = document.getElementById("price-input-".concat(productId));
    var newTitle = titleInput.value.trim();
    var newPrice = priceInput.value.trim();
    if (!newTitle && !newPrice) {
        alert("Please enter a new title or price.");
        return;
    }
    var updatedData = {};
    if (newTitle)
        updatedData.title = newTitle;
    if (newPrice && !isNaN(parseFloat(newPrice)))
        updatedData.price = parseFloat(newPrice);
    fetch("https://fakestoreapi.com/products/".concat(productId), {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: { "Content-Type": "application/json" }
    })
        .then(function (response) { return response.json(); })
        .then(function (updatedProduct) {
        alert("Product ".concat(productId, " updated successfully!"));
        // Update UI dynamically
        if (updatedProduct.title) {
            document.getElementById("title-".concat(productId)).innerText = updatedProduct.title;
        }
        if (updatedProduct.price) {
            document.getElementById("price-".concat(productId)).innerText = updatedProduct.price.toFixed(2);
        }
        // Clear input fields
        titleInput.value = "";
        priceInput.value = "";
    })
        .catch(function (error) { return console.error("Error updating product:", error); });
}
// DELETE: Remove product dynamically
function deleteProduct(productId) {
    if (!confirm("Are you sure you want to delete this product?"))
        return;
    fetch("https://fakestoreapi.com/products/".concat(productId), {
        method: "DELETE"
    })
        .then(function () {
        var _a, _b;
        alert("Product ".concat(productId, " deleted successfully!"));
        // Remove product from the DOM instead of reloading
        var productCard = (_b = (_a = document.getElementById("title-".concat(productId))) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
        if (productCard)
            productCard.remove();
    })
        .catch(function (error) { return console.error("Error deleting product:", error); });
}
