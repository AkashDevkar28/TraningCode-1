interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

const adminProductsContainer = document.getElementById("admin-products") as HTMLElement;

// Fetch and display products in a grid layout
fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then((products: Product[]) => {
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-4", "mb-4"); // Bootstrap grid for 3 columns per row

            productCard.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${product.image}" class="card-img-top img-fluid p-3" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate">${product.title}</h5>
                        <p class="card-text fw-bold text-success">$<span id="price-${product.id}">${product.price.toFixed(2)}</span></p>
                        <input type="text" id="title-input-${product.id}" class="form-control mb-2" placeholder="New Title">
                        <input type="number" id="price-input-${product.id}" class="form-control mb-2" placeholder="New Price">
                        <div class="mt-auto">
                            <button class="btn btn-warning btn-sm me-2 w-100" onclick="updateProduct(${product.id})">Update</button>
                            <button class="btn btn-danger btn-sm w-100 mt-2" onclick="deleteProduct(${product.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `;
            adminProductsContainer.appendChild(productCard);
        });
    })
    .catch(error => console.error("Error fetching products:", error));


// PATCH: Update product title and price
function updateProduct(productId: number): void {
    const titleInput = document.getElementById(`title-input-${productId}`) as HTMLInputElement;
    const priceInput = document.getElementById(`price-input-${productId}`) as HTMLInputElement;
    
    const newTitle = titleInput.value.trim();
    const newPrice = priceInput.value.trim();

    if (!newTitle && !newPrice) {
        alert("Please enter a new title or price.");
        return;
    }

    const updatedData: Partial<Product> = {};
    if (newTitle) updatedData.title = newTitle;
    if (newPrice && !isNaN(parseFloat(newPrice))) updatedData.price = parseFloat(newPrice);

    fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(updatedProduct => {
        alert(`Product ${productId} updated successfully!`);

        // Update UI dynamically
        if (updatedProduct.title) {
            document.getElementById(`title-${productId}`)!.innerText = updatedProduct.title;
        }
        if (updatedProduct.price) {
            document.getElementById(`price-${productId}`)!.innerText = updatedProduct.price.toFixed(2);
        }

        // Clear input fields
        titleInput.value = "";
        priceInput.value = "";
    })
    .catch(error => console.error("Error updating product:", error));
}

// DELETE: Remove product dynamically
function deleteProduct(productId: number): void {
    if (!confirm("Are you sure you want to delete this product?")) return;

    fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "DELETE"
    })
    .then(() => {
        alert(`Product ${productId} deleted successfully!`);

        // Remove product from the DOM instead of reloading
        const productCard = document.getElementById(`title-${productId}`)?.parentElement?.parentElement;
        if (productCard) productCard.remove();
    })
    .catch(error => console.error("Error deleting product:", error));
}
