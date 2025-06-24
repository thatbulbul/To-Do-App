const inputBox = document.getElementById('inputbox');
const Add = document.getElementById('Add');
const todolist = document.getElementById('todolist');

// Add Todo
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in it");
    return;
  }
  createTodoItem(inputText);       // create the list item visually
  saveLocalTodos(inputText);       // store in localStorage
  inputBox.value = "";             // clear input
};

// Create a todo element with edit/delete buttons
const createTodoItem = (text) => {
  const li = document.createElement("li");

  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "editbtn");
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit your task:", p.innerText);
    if (newText !== null && newText.trim() !== "") {
      p.innerText = newText.trim();
      updateLocalTodos(); // update localStorage with latest changes
    }
  });
  li.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Remove";
  deleteBtn.classList.add("btn", "deletebtn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateLocalTodos(); // remove from localStorage as well
  });
  li.appendChild(deleteBtn);

  todolist.appendChild(li);
};

// Save todo in localStorage
const saveLocalTodos = (todo) => {
  let todos = localStorage.getItem("todos") 
                ? JSON.parse(localStorage.getItem("todos")) 
                : [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Get todos from localStorage on page load
const getLocalTodos = () => {
  let todos = localStorage.getItem("todos")
                ? JSON.parse(localStorage.getItem("todos"))
                : [];
  todos.forEach(todo => {
    createTodoItem(todo);
  });
};

// Update localStorage after editing/deleting
const updateLocalTodos = () => {
  let updatedTodos = [];
  document.querySelectorAll('#todolist li p').forEach(p => {
    updatedTodos.push(p.innerText);
  });
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

// Event Listeners
Add.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos);
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

