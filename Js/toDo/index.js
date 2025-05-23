const loadTasks = () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskPlc = document.getElementById("tsks");
  taskPlc.innerHTML = ""; // Clear any existing rows before loading new ones

  tasks.forEach((task, index) => {
    const entry = document.createElement("tr");
    entry.innerHTML = `
      <td>${task.name}</td>
      <td><button class="btn btn-warning btn-sm" onclick="editTask(${index})">Edit</button></td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button></td>
    `;
    taskPlc.appendChild(entry);
  });
};

// Edit task function
const editTask = (index) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskName = prompt("Edit Task", tasks[index].name); // Open prompt to edit task name
  if (taskName !== null && taskName.trim() !== "") {
    tasks[index].name = taskName.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); // Reload tasks to update the UI
  }
};

// Delete task function
const deleteTask = (index) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1); // Remove the task from the array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
    loadTasks(); // Reload tasks to update the UI
  }
};

document.getElementById("todoform").addEventListener("submit", function (e) {
  e.preventDefault();
  const taskName = document.getElementById("tskinp").value.trim();
  if (taskName === "") {
    alert("Enter the task name");
  } else {
    const tskObj = {
      name: taskName,
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(tskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("todoform").reset();
    loadTasks(); // Reload tasks to update the UI
  }
});

window.onload = loadTasks;
