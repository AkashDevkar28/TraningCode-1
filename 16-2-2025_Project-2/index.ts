interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

const productsContainer = document.getElementById("products") as HTMLElement;
const cartCount = document.getElementById("cart-count") as HTMLElement;
const cartItems = document.getElementById("cart-items") as HTMLElement;
let cart: Product[] = [];

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then((products: Product[]) => {
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("card", "p-3", "m-2", "shadow-sm", "text-center");
            productCard.style.width = "18rem";
            productCard.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: contain;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text fw-bold">$${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">
                        Add to Cart
                    </button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
    });

function addToCart(id: number, title: string, price: number, image: string): void {
    cart.push({ id, title, price, image });
    updateCart();
}

function removeFromCart(index: number): void {
    cart.splice(index, 1);
    updateCart();
}

function updateCart(): void {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "shadow-sm", "p-3", "rounded");

        li.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.image}" class="me-3 border rounded" style="width: 50px; height: 50px; object-fit: contain;">
                <div>
                    <h6 class="mb-1">${item.title}</h6>
                    <span class="text-success fw-bold">$${item.price}</span>
                </div>
            </div>
            <button class="btn btn-outline-danger btn-sm d-flex align-items-center" onclick="removeFromCart(${index})">
                <i class="bi bi-trash-fill me-1"></i> Remove
            </button>
        `;
        cartItems.appendChild(li);
    });

    cartCount.textContent = cart.length.toString();
}


