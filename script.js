document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById("task-input");
    let prioritySelect = document.getElementById("priority-select");
    let taskList = document.getElementById("task-list");
    let taskText = taskInput.value.trim();
    let priority = prioritySelect.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    let listItem = document.createElement("li");
    listItem.className = priority + "-priority";
    listItem.innerHTML = `
        <span>${taskText} (${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority)</span>
        <button class="delete-btn" onclick="deleteTask(this)">❌</button>
    `;
    
    taskList.appendChild(listItem);
    saveTasks();
    taskInput.value = "";
}

function deleteTask(button) {
    let listItem = button.parentElement;
    listItem.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(item => {
        tasks.push({ text: item.innerText, priority: item.className });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("task-list");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    tasks.forEach(task => {
        let listItem = document.createElement("li");
        listItem.className = task.priority;
        listItem.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(this)">❌</button>
        `;
        taskList.appendChild(listItem);
    });
}