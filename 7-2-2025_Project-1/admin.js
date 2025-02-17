const adminProductsContainer = document.getElementById('admin-products');
const apiUrl = "https://fakestoreapi.com/products";


function fetchAdminProducts() {
  axios.get(apiUrl)
    .then(response => {
      const products = response.data;
      displayAdminProducts(products);
    })
    .catch(error => console.error('Error fetching products:', error));
}


function displayAdminProducts(products) {
  adminProductsContainer.innerHTML = '';
  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td><img src="${product.image}" width="50"></td>
      <td>${product.title}</td>
      <td>$${product.price}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="showUpdateForm(${product.id})">Update</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
      </td>
    `;
    adminProductsContainer.appendChild(row);
  });
}


function showAddProductForm() {
  document.getElementById('addProductForm').style.display = 'block';
}


function addProduct() {
  const newProduct = {
    title: document.getElementById('newTitle').value,
    price: parseFloat(document.getElementById('newPrice').value),
    description: document.getElementById('newDescription').value,
    image: document.getElementById('newImage').value,
    category: document.getElementById('newCategory').value
  };

  axios.post(apiUrl, newProduct)
    .then(response => {
      alert('Product added successfully!');
      fetchAdminProducts();
      document.getElementById('addProductForm').reset();
    })
    .catch(error => console.error('Error adding product:', error));
}


function showUpdateForm(productId) {
  const newTitle = prompt("Enter new title:");
  const newPrice = parseFloat(prompt("Enter new price:"));
  const newDescription = prompt("Enter new description:");
  const newImage = prompt("Enter new image URL:");
  const newCategory = prompt("Enter new category:");

  if (newTitle && newPrice && newDescription && newImage && newCategory) {
    updateProduct(productId, newTitle, newPrice, newDescription, newImage, newCategory);
  }
}


function updateProduct(productId, title, price, description, image, category) {
  axios.put(`${apiUrl}/${productId}`, { title, price, description, image, category })
    .then(response => {
      alert('Product updated successfully!');
      fetchAdminProducts();
    })
    .catch(error => console.error('Error updating product:', error));
}


function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    axios.delete(`${apiUrl}/${productId}`)
      .then(response => {
        alert('Product deleted successfully!');
        fetchAdminProducts();
      })
      .catch(error => console.error('Error deleting product:', error));
  }
}


fetchAdminProducts();
const titleInput = document.getElementById('newTitle');
const priceInput = document.getElementById('newPrice');
const descriptionInput = document.getElementById('newDescription');
const imageInput = document.getElementById('newImage');
const categoryInput = document.getElementById('newCategory');
const submitBtn = document.getElementById('submitBtn');


const titleError = document.getElementById('titleError');
const priceError = document.getElementById('priceError');
const descriptionError = document.getElementById('descriptionError');
const imageError = document.getElementById('imageError');
const categoryError = document.getElementById('categoryError');


function validateForm() {
  let isValid = true;

 
  if (titleInput.value.trim() === '') {
    titleError.textContent = "Title is required.";
    isValid = false;
  } else {
    titleError.textContent = "";
  }

 
  if (priceInput.value.trim() === '' || isNaN(priceInput.value) || priceInput.value <= 0) {
    priceError.textContent = "Enter a valid price.";
    isValid = false;
  } else {
    priceError.textContent = "";
  }

  if (descriptionInput.value.trim() === '') {
    descriptionError.textContent = "Description is required.";
    isValid = false;
  } else {
    descriptionError.textContent = "";
  }


  const urlPattern = /^(http|https):\/\/[^ "]+$/;
  if (!urlPattern.test(imageInput.value.trim())) {
    imageError.textContent = "Enter a valid image URL.";
    isValid = false;
  } else {
    imageError.textContent = "";
  }


  if (categoryInput.value.trim() === '') {
    categoryError.textContent = "Category is required.";
    isValid = false;
  } else {
    categoryError.textContent = "";
  }

  submitBtn.disabled = !isValid;
}


titleInput.addEventListener('input', validateForm);
priceInput.addEventListener('input', validateForm);
descriptionInput.addEventListener('input', validateForm);
imageInput.addEventListener('input', validateForm);
categoryInput.addEventListener('input', validateForm);


function addProduct() {
    if (submitBtn.disabled) return;
  
    const newProduct = {
      title: titleInput.value,
      price: parseFloat(priceInput.value),
      description: descriptionInput.value,
      image: imageInput.value,
      category: categoryInput.value
    };
  
    axios.post("https://fakestoreapi.com/products", newProduct)
      .then(response => {
        alert('Product added successfully!');
        fetchAdminProducts(); 
  
        titleInput.value = "";
        priceInput.value = "";
        descriptionInput.value = "";
        imageInput.value = "";
        categoryInput.value = "";
  
      })
      .catch(error => console.error('Error adding product:', error));
  }
  