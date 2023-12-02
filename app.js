const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");

const addTodo = () => {
  inputValue = todoInput.value;
  if (inputValue.trim().length > 0) {
    let li = document.createElement("li");
    li.innerHTML = inputValue;
    li.classList.add("mt-4", "fw-bold");

    todoList.appendChild(li);

    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit Todo";

    editButton.classList.add("btn", "btn-info", "me-2", "ms-2");
    li.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Done Todo";

    deleteButton.classList.add("btn", "btn-warning");
    li.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      deleteTodo(li);
    });
    editButton.addEventListener("click", () => {
      editTodo(li);
    });

    todoInput.value = "";

    if (todoList.childNodes.length > 0) {
      const deleteButton = document.getElementById("deleteButton");
      deleteButton.addEventListener("click", () => {
        deleteAll();
      });
      deleteButton.hidden = false;
    } else {
      const deleteButton = document.getElementById("deleteButton");
      deleteButton.hidden = true;
    }
  } else {
    alert("invalid input");
  }
};

const deleteTodo = (li) => {
  li.remove();

  const deleteButton = document.getElementById("deleteButton");
  todoList.childNodes.length > 0
    ? (deleteButton.hidden = false)
    : (deleteButton.hidden = true);
};

const editTodo = (li) => {
  let todoValue = li.childNodes[0].nodeValue;

  todoInput.value = todoValue;

  const saveButton = document.getElementById("saveButton");
  saveButton.hidden = false;

  todoButton = document.getElementById("todoButton");
  todoButton.style.display = "none";

  saveButton.addEventListener(
    "click",
    () => {
      li.childNodes[0].nodeValue = todoInput.value;
      saveButton.hidden = true;
      todoButton.style.display = "inline-block";
      todoInput.value = "";
    },
    { once: true }
  );
};

const deleteAll = () => {
  const restoreArray = [];

  while (todoList.firstChild) {
    restoreArray.unshift(todoList.lastChild);
    todoList.removeChild(todoList.lastChild);
  }

  const deleteButton = document.getElementById("deleteButton");
  deleteButton.hidden = true;

  const restoreButton = document.getElementById("restore-button");
  restoreButton.hidden = false;

  restoreButton.addEventListener(
    "click",
    () => {
      for (let i = 0; i < restoreArray.length; i++) {
        todoList.appendChild(restoreArray[i]);
      }
      restoreArray.length = 0;
      restoreButton.hidden = true;
      deleteButton.hidden = false;
    },
    { once: true }
  );
};
