
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const totalTasks = document.getElementById("total-tasks");
const pendingTasks = document.getElementById("pending-tasks");
const completedTasks = document.getElementById("completed-tasks");

const emptyMessage = document.getElementById("empty-message");


// Step 2: Load saved tasks from Local Storage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Step 3: Display tasks on the screen

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {
            toggleTask(task.id);
        });

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateStats();

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";
}


// Step 4: Add a new task

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});


// Step 5: Save tasks in Local Storage

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Step 6: Mark a task as completed or pending

function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();

    renderTasks();
}


// Step 7: Delete a task

function deleteTask(id) {

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();

    renderTasks();
}


// Step 8: Update task counters

function updateStats() {

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;

    totalTasks.textContent = tasks.length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;
}


// Step 9: Display previously saved tasks

renderTasks();
