const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Afficher les tâches
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Ajouter une tâche
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks();
});

// Marquer comme complétée
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Supprimer une tâche
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Initialisation
renderTasks();
