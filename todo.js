const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

for (const todo of savedTodos) {
    addTodoTolist(todo);
}



function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") return

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
    };

    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    addTodoTolist(todo);
    todoInput.value = "";
}

function toggleComplate(id) {
    const todo = savedTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;

    localStorage.setItem("todos", JSON.stringify(savedTodos));
    const todoElement = document.getElementById(id);
    todoElement.classList.toggle('completed', todo.completed);
}

function editTodo(id) {
    const todo = savedTodos.find((todo) => todo.id === id)
    const newText = prompt("Görevi düzenleyin: ", todo.text);
    if (newText !== null) {
        todo.text = newText.trim()
        localStorage.setItem('todos', JSON.stringify(savedTodos));
        const todoElement = document.getElementById(id)
        todoElement.querySelector("span").textContent = newText;
    }
}

function removeTodo(id) {
    const todoElement = document.getElementById(id);
    todoElement.style.animation = "fadeOut 0.3s ease";

    setTimeout(() => {
        savedTodos.splice(
            savedTodos.findIndex((todo) => todo.id === id),
            1);
        localStorage.setItem('todos', JSON.stringify(savedTodos));
        todoElement.remove();
    }, 300);
}

function addTodoTolist(todo) {
    const li = document.createElement("li");
    li.setAttribute("id", todo.id);
    li.innerHTML = `
        <span title="${todo.text}">${todo.text}</span>
        <button onclick="toggleComplate(${todo.id})">
        <i class="fa-solid fa-check"></i>
        </button>
        <button onclick="editTodo(${todo.id})">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button onclick="removeTodo(${todo.id})">
        <i class="fa-solid fa-xmark"></i>
        </button>
    `;
    li.classList.toggle("completed", todo.completed);
    todoList.appendChild(li);
}
