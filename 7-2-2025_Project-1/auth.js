
const users = JSON.parse(localStorage.getItem("users")) || [];


document.getElementById("registerForm")?.addEventListener("submit", function (event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }


  if (users.some(user => user.email === email)) {
    alert("Email is already registered! Try logging in.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! Redirecting to login...");
  window.location.href = "login.html";
});


document.getElementById("loginForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    alert("Login successful! Redirecting to homepage...");
    localStorage.setItem("loggedInUser", JSON.stringify(user)); 
    window.location.href = "product.html";
  } else {
    alert("Invalid credentials! Please try again.");
  }
});


document.getElementById("adminLoginForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("adminUsername").value;
  const password = document.getElementById("adminPassword").value;

  if (username === "admin" && password === "admin123") {
    alert("Admin login successful! Redirecting to admin panel...");
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html"; 
  } else {
    alert("Invalid admin credentials!");
  }
});


function logout() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("adminLoggedIn");
  alert("Logged out successfully!");
  window.location.href = "login.html";
}
