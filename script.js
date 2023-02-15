const inputEl = document.querySelector(".todo__input");
const todoTasksEl = document.querySelectorAll(".todo__task");
const todoTasksList = document.querySelector(".todo__tasks");
const errorMessageEl = document.querySelector(".todo__error-message");
const defualtMessage = document.querySelector(".todo__defualt");

// posprema u loacal storage
const tasks =
  localStorage.getItem("tasks") === null
    ? []
    : JSON.parse(localStorage.getItem("tasks"));

if (localStorage.getItem("tasks") !== null) {
  renderToDoTasks(tasks);
}

// event handler functions sprema event kao objekt

inputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleTaskSubmit(event);
  }
});

inputEl.addEventListener("click", function (event) {
  if (inputEl.value === "") {
    return;
  }
  handleTaskSubmit(event);
});

function handleTaskSubmit(event) {
  event.preventDefault();

  const task = inputEl.value;

  if (tasks !== 0) {
    defualtMessage.style.display = "none";
  } else {
    defualtMessage.style.display = "block";
  }

  if (tasks.indexOf(task) === -1) {
    errorMessageEl.style.display = "none";
    tasks.push(task);
    inputEl.value = ""; // briše input nakon dodavanja

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderToDoTasks(tasks);
  } else {
    errorMessageEl.style.display = "block";
  }
}

function renderToDoTasks(tasks) {
  todoTasksList.innerHTML = ""; //briše nam sve elemente array-a te ih opet ubacuje sve

  tasks.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.className = "todo__task";

    const paragraphEl = document.createElement("p");

    paragraphEl.innerText = `${index + 1}. ${task}`;

    const deleteEl = document.createElement("a");
    deleteEl.className = "todo__task-delete";
    deleteEl.innerText = "Delete";
    deleteEl.addEventListener("click", (event) => {
      //   let currentText = event.target.previousSibling.innerText;
      //   currentText = currentText.substring(currentText.indexOf(" ") + 1);
      // setTimeout((deleteEl.style.backgroundColor = "#b86868"), 1000);
      tasks.splice(tasks.indexOf(task), 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderToDoTasks(tasks);
    });

    taskEl.appendChild(paragraphEl);
    taskEl.appendChild(deleteEl);

    todoTasksList.append(taskEl);
  });
}

// na klik taska dobivamo njegov element na kojeg se referencira target

todoTasksEl.forEach((todoTaskEl) =>
  todoTaskEl.addEventListener("click", (event) => {
    console.log(event.target);
  })
);
