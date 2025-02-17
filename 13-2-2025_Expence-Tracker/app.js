// Enum for expense categories
var Category;
(function (Category) {
    Category["Food"] = "Food";
    Category["Travel"] = "Travel";
    Category["Bills"] = "Bills";
    Category["Shopping"] = "Shopping";
    Category["Entertainment"] = "Entertainment";
})(Category || (Category = {}));
// Expense tracker state management (load from local storage)
var expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
// Function to add a new expense
function addExpense(expense) {
    expenses.push(expense);
    saveToLocalStorage();
}
// Function to save expenses to local storage
function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
// Function to get filtered expenses
function getFilteredExpenses(filters) {
    return expenses.filter(function (expense) {
        var isCategoryMatch = filters.category ? expense.category === filters.category : true;
        var isDateMatch = ((filters.startDate ? new Date(expense.date) >= new Date(filters.startDate) : true) &&
            (filters.endDate ? new Date(expense.date) <= new Date(filters.endDate) : true));
        return isCategoryMatch && isDateMatch;
    });
}
// Handle form submission to add a new expense
var expenseForm = document.getElementById("expenseForm");
if (expenseForm) {
    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var amount = parseFloat(document.getElementById("amount").value);
        var category = document.getElementById("category").value;
        var date = document.getElementById("date").value;
        var description = document.getElementById("description").value;
        if (!amount || !date || !category || !description) {
            alert("Please fill in all fields before adding an expense.");
            return;
        }
        var newExpense = {
            id: Date.now(),
            amount: amount,
            category: category,
            date: date,
            description: description,
        };
        addExpense(newExpense);
        renderExpenseHistory();
        expenseForm.reset(); // Reset form after submission
    });
}
// Handle filtering
var filterCategory = document.getElementById("filterCategory");
var filterStartDate = document.getElementById("startDate");
var filterEndDate = document.getElementById("endDate");
var filterBtn = document.getElementById("filterBtn");
if (filterBtn) {
    filterBtn.addEventListener("click", function () {
        var filters = {
            category: filterCategory.value ? filterCategory.value : undefined,
            startDate: filterStartDate.value,
            endDate: filterEndDate.value,
        };
        var filteredExpenses = getFilteredExpenses(filters);
        renderExpenseHistory(filteredExpenses);
    });
}
// Function to render the list of expenses
function renderExpenseHistory(filteredExpenses) {
    if (filteredExpenses === void 0) { filteredExpenses = expenses; }
    var expenseHistory = document.getElementById("expenseHistory");
    if (!expenseHistory) {
        console.error("Expense history element not found!");
        return;
    }
    expenseHistory.innerHTML = ""; // Clear the current list
    if (filteredExpenses.length === 0) {
        expenseHistory.innerHTML = "<li>No expenses found.</li>";
        return;
    }
    filteredExpenses.forEach(function (expense) {
        var li = document.createElement("li");
        li.innerText = "".concat(expense.amount, " - ").concat(expense.category, " - ").concat(expense.date, " - ").concat(expense.description);
        expenseHistory.appendChild(li);
    });
}
// Function to clear all expenses from local storage and re-render UI
function clearAllExpenses() {
    console.log("Clear button clicked!"); // Debugging log
    localStorage.removeItem("expenses"); // Remove from local storage
    expenses = []; // Clear the expenses array
    renderExpenseHistory(); // Re-render UI
}
// Add an event listener for the "Clear All" button
var clearAllBtn = document.getElementById("clearAllBtn");
if (clearAllBtn) {
    clearAllBtn.addEventListener("click", function () {
        clearAllExpenses();
    });
}
else {
    console.error("Clear All button not found!"); // Debugging log
}
// Initial render of expenses when the page loads
renderExpenseHistory();
