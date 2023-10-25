document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  
  function updateLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }


  function displayTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
              <span>${task}</span>
              <button class="edit" data-index="${index}">Edit</button>
              <button class="delete" data-index="${index}">Delete</button>
          `;
          taskList.appendChild(li);
      });
  }

  
  addTaskButton.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
          tasks.push(taskText);
          updateLocalStorage();
          displayTasks();
          taskInput.value = "";
      }
  });

  
  taskList.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit")) {
          const index = e.target.getAttribute("data-index");
          const updatedTaskText = prompt("Edit the task:", tasks[index]);
          if (updatedTaskText !== null) {
              tasks[index] = updatedTaskText;
              updateLocalStorage();
              displayTasks();
          }
      }
  });

  
  taskList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
          const index = e.target.getAttribute("data-index");
          tasks.splice(index, 1);
          updateLocalStorage();
          displayTasks();
      }
  });

  
  displayTasks();
});

      
 