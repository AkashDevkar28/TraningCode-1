
const addTask = document.getElementById('addTask');
const deleteBtn =  document.getElementById('deleteAllBtn')
const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

document.addEventListener("DOMContentLoaded", function () {
    clearStorageOnRefresh();
    fetchAndStoreTodos();
});


function clearStorageOnRefresh() {
    localStorage.clear();
    document.getElementById("todo-list").innerHTML = "";
}


function fetchAndStoreTodos() {
    axios.get(API_URL)
        .then(response => {
            localStorage.setItem("todos", JSON.stringify(response.data));
            localStorage.setItem("addedTodos", JSON.stringify([])); 
        })
        .catch(error => console.error("Error fetching todos:", error));
}


addTask.addEventListener('click',function() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let addedTodos = JSON.parse(localStorage.getItem("addedTodos")) || [];

    if (todos.length === 0) {
        alert("No more tasks to add!");
        return;
    }

    const nextTask = todos.shift(); 
    addedTodos.push(nextTask);

    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("addedTodos", JSON.stringify(addedTodos));

    const li = createTodoElement(nextTask);
    document.getElementById("todo-list").appendChild(li);
});


function createTodoElement(task) {
    const li = document.createElement("li");
    li.dataset.task = JSON.stringify(task); 

    const taskText = document.createElement("pre");
    taskText.textContent = formatTaskAsJSON(task);

   
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.onclick = () => editTask(li);

   
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.onclick = () => deleteTask(li);


    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    
    li.appendChild(taskText);
    li.appendChild(buttonsDiv);

    return li;
}


function editTask(li) {
    const preElement = li.querySelector("pre");
    const editButton = li.querySelector(".edit-btn");
    let task = JSON.parse(li.dataset.task); 

    if (editButton.textContent === "Edit") {
        
        preElement.innerHTML = `
            userId: <input type="number" value="${task.userId}" id="edit-userId"><br>
            id: ${task.id}<br>
            title: <input type="text" value="${task.title}" id="edit-title"><br>
            completed: <select id="edit-completed">
                <option value="true" ${task.completed ? "selected" : ""}>true</option>
                <option value="false" ${!task.completed ? "selected" : ""}>false</option>
            </select>
        `;
        editButton.textContent = "Save";
    } else {
       
        const updatedTask = {
            userId: parseInt(document.getElementById("edit-userId").value),
            id: task.id,
            title: document.getElementById("edit-title").value,
            completed: document.getElementById("edit-completed").value === "true"
        };

      
        updateTaskInLocalStorage(updatedTask);

        
        preElement.textContent = formatTaskAsJSON(updatedTask);
        li.dataset.task = JSON.stringify(updatedTask);
        editButton.textContent = "Edit";
    }
}


function deleteTask(li) {
    let task = JSON.parse(li.dataset.task);
    let addedTodos = JSON.parse(localStorage.getItem("addedTodos")) || [];

    
    addedTodos = addedTodos.filter(todo => todo.id !== task.id);
    localStorage.setItem("addedTodos", JSON.stringify(addedTodos));

    
    li.remove();
}


function updateTaskInLocalStorage(updatedTask) {
    let addedTodos = JSON.parse(localStorage.getItem("addedTodos")) || [];

    addedTodos = addedTodos.map(todo => todo.id === updatedTask.id ? updatedTask : todo);
    localStorage.setItem("addedTodos", JSON.stringify(addedTodos));
}

function formatTaskAsJSON(task) {
    return `
userId: ${task.userId}
id: ${task.id}
title: "${task.title}"
completed: ${task.completed} 
`;
}


deleteBtn.addEventListener('click',function() {
    if (confirm("Are you sure you want to delete all tasks?")) {
   
    localStorage.setItem("todos", JSON.stringify([]));
    localStorage.setItem("addedTodos", JSON.stringify([]));

    
    document.getElementById("todo-list").innerHTML = "";

    location.reload();

}
});