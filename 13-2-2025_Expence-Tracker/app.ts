
enum Category {
  Food = "Food",
  Travel = "Travel",
  Bills = "Bills",
  Shopping = "Shopping",
  Entertainment = "Entertainment",
}


interface Expense {
  id: number;
  amount: number;
  category: Category;
  date: string;
  description: string;
}


type FilterOptions = {
  category?: Category;
  startDate?: string;
  endDate?: string;
};

let expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");


function addExpense(expense: Expense) {
  expenses.push(expense);
  saveToLocalStorage();
}


function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}


function getFilteredExpenses(filters: FilterOptions): Expense[] {
  return expenses.filter((expense) => {
    const isCategoryMatch = filters.category
      ? expense.category === filters.category
      : true;
    const isDateMatch =
      (filters.startDate
        ? new Date(expense.date) >= new Date(filters.startDate)
        : true) &&
      (filters.endDate
        ? new Date(expense.date) <= new Date(filters.endDate)
        : true);
    return isCategoryMatch && isDateMatch;
  });
}


const expenseForm = document.getElementById("expenseForm") as HTMLFormElement;
if (expenseForm) {
  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const amount = parseFloat(
      (document.getElementById("amount") as HTMLInputElement).value
    );
    const category = (document.getElementById("category") as HTMLSelectElement)
      .value as Category;
    const date = (document.getElementById("date") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    ).value;

    if (!amount || !date || !category || !description) {
      alert("Please fill in all fields before adding an expense.");
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      amount,
      category,
      date,
      description,
    };

    addExpense(newExpense);
    renderExpenseHistory();
    expenseForm.reset(); 
  });
}


const filterCategory = document.getElementById(
  "filterCategory"
) as HTMLSelectElement;
const filterStartDate = document.getElementById(
  "startDate"
) as HTMLInputElement;
const filterEndDate = document.getElementById("endDate") as HTMLInputElement;
const filterBtn = document.getElementById("filterBtn") as HTMLButtonElement;

if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    const filters: FilterOptions = {
      category: filterCategory.value
        ? (filterCategory.value as Category)
        : undefined,
      startDate: filterStartDate.value,
      endDate: filterEndDate.value,
    };

    const filteredExpenses = getFilteredExpenses(filters);
    renderExpenseHistory(filteredExpenses);
  });
}


function renderExpenseHistory(filteredExpenses: Expense[] = expenses) {
  const expenseHistory = document.getElementById(
    "expenseHistory"
  ) as HTMLUListElement;
  if (!expenseHistory) {
    console.error("Expense history element not found!");
    return;
  }

  expenseHistory.innerHTML = ""; 

  if (filteredExpenses.length === 0) {
    expenseHistory.innerHTML = "<li>No expenses found.</li>";
    return;
  }

  filteredExpenses.forEach((expense) => {
    const li = document.createElement("li");
    li.innerText = `${expense.amount} - ${expense.category} - ${expense.date} - ${expense.description}`;
    expenseHistory.appendChild(li);
  });
}


function clearAllExpenses() {
  console.log("Clear button clicked!"); 
  localStorage.removeItem("expenses");
  expenses = []; 
  renderExpenseHistory();
}


const clearAllBtn = document.getElementById("clearAllBtn") as HTMLButtonElement;
if (clearAllBtn) {
  clearAllBtn.addEventListener("click", () => {
    clearAllExpenses();
  });
} else {
  console.error("Clear All button not found!"); 
}


renderExpenseHistory();
