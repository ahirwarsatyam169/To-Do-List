let addbtn = document.querySelector("#addbtn");
let taskInput = document.querySelector("#task");
let list = document.querySelector("#tasklist");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.index = index;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    list.appendChild(li);
  });
}

// Add task
function addTask() {
  let text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    text: text,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

addbtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Handle click + double click
list.addEventListener("click", function (event) {
  if (event.target.tagName !== "LI") return;

  let index = event.target.dataset.index;

  // SINGLE CLICK
  if (event.detail === 1) {
    setTimeout(() => {
      if (event.detail === 1) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      }
    }, 200);
  }

  // DOUBLE CLICK
  if (event.detail === 2) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
});

renderTasks();
