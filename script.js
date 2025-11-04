let addbtn = document.querySelector("#addbtn");
let taskInput = document.querySelector("#task");
let list = document.querySelector("#tasklist");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Remove any empty/invalid tasks
tasks = tasks.filter(t => t && typeof t.text === "string" && t.text.trim() !== "");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach(t => {
    let li = document.createElement("li");
    li.textContent = t.text;
    if (t.completed) {
      li.style.textDecoration = "line-through";
    }
    list.appendChild(li);
  });
}

// add new task
function addTask() {
  let text = taskInput.value.trim();
  if (!text) return;

  let newTask = { text: text, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

addbtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// toggle completed on single click
list.addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    let clickedText = event.target.textContent;
    let taskObj = tasks.find(t => t.text === clickedText);
    if (taskObj) {
      taskObj.completed = !taskObj.completed;
      saveTasks();
      renderTasks();
    }
  }
});

// remove on double click
list.addEventListener("dblclick", function(event) {
  if (event.target.tagName === "LI") {
    let clickedText = event.target.textContent;
    tasks = tasks.filter(t => t.text !== clickedText);
    saveTasks();
    renderTasks();
  }
});

// initial render
renderTasks();
