document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const ulTodo = document.getElementById("ul-todo");
    const deleteAllBtn = document.getElementById("delete-all-btn");

    buttonTodo.addEventListener("click", () => {
        const text = inputTodo.value.trim();
        if (!text) return;

        createTodo(text);
        inputTodo.value = "";
        saveAllTodo();
    });

    const createTodo = (task) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";
        li.innerHTML = `
            <span class="text-todo">${task}</span>
            <div class="btn-group">
                <button class="btn btn-danger">Edit</button>
                <button class="btn btn-warning">Delete</button>
            </div>
        `;
        ulTodo.appendChild(li);
    };

    ulTodo.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-warning")) {
            if (confirm("Are you sure you want to delete this task?")) {
                e.target.closest(".list-group-item").remove();
                saveAllTodo();
            }
        }

        if (e.target.classList.contains("btn-danger")) {
            const li = e.target.closest(".list-group-item");
            const span = li.querySelector(".text-todo");

            const input = document.createElement("input");
            input.type = "text";
            input.value = span.textContent;
            input.className = "form-control form-control-sm";
            li.replaceChild(input, span);

            e.target.textContent = "Save";
            e.target.classList.replace("btn-danger", "btn-success");
            input.focus();
        } 
        
        else if (e.target.classList.contains("btn-success")) {
            const li = e.target.closest(".list-group-item");
            const input = li.querySelector("input");
            if (!input) return;

            const newText = input.value.trim();
            if (!newText) return;

            const span = document.createElement("span");
            span.className = "text-todo";
            span.textContent = newText;
            li.replaceChild(span, input);

            e.target.textContent = "Edit";
            e.target.classList.replace("btn-success", "btn-danger");
            saveAllTodo();
        }
    });

    deleteAllBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete all tasks?")) {
            ulTodo.innerHTML = ''; // Clear the list
            localStorage.removeItem("allTodos"); // Clear from localStorage
        }
    });

    const saveAllTodo = () => {
        const allTodos = [...document.querySelectorAll(".text-todo")].map(task => task.textContent);
        localStorage.setItem("allTodos", JSON.stringify(allTodos));
    };

    const loadAllTodo = () => {
        const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
        allTodos.forEach(task => createTodo(task));
    };

    loadAllTodo();
});
