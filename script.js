document.addEventListener("DOMContentLoaded", function() {
    // Task add
    loadTasks();

    // function added
    let taskList = document.getElementById("list");
    taskList.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            markAsDone(e.target);
        }
    });
});

// new function
function newElement() {
    let taskInput = document.getElementById("task");
    let taskValue = taskInput.value.trim();

    if (!taskValue) {
        showToast("error", "Listeye boş ekleme yapamazsınız!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = taskValue;
    document.getElementById("list").appendChild(li);
    taskInput.value = "";

    showToast("success", "Listeye eklendi.");

    // Görevi localStorage'a ekleyin
    saveTask(taskValue);
}

// Function to mark the task as completed
function markAsDone(taskElement) {
    taskElement.classList.toggle("checked");
    updateLocalStorage();
}

// Function to show Toast message
function showToast(type, message) {
    let toastElement = document.querySelector(`.toast.${type}`);
    toastElement.querySelector(".toast-body").textContent = message;
    $(toastElement).toast("show");
}

// Save tasks to localStorage
function saveTask(taskValue) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskValue);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Upload tasks
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(taskValue => {
        let li = document.createElement("li");
        li.textContent = taskValue;
        document.getElementById("list").appendChild(li);
    });
}

// Update task
function updateLocalStorage() {
    let tasks = [...document.querySelectorAll("#list li")].map(li => li.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// New task add function
function newElement() {
    let taskInput = document.getElementById("task");
    let taskValue = taskInput.value.trim();

    if (!taskValue) {
        showToast("error", "Listeye boş ekleme yapamazsınız!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = taskValue;

    // Delete button add
    let closeBtn = document.createElement("span");
    closeBtn.textContent = "x";
    closeBtn.className = "close";
    closeBtn.onclick = function() {
        removeElement(this.parentElement);
    };
    li.appendChild(closeBtn);

    document.getElementById("list").appendChild(li);
    taskInput.value = "";

    showToast("success", "Listeye eklendi.");

    // Görevi localStorage'a ekleyin
    saveTask(taskValue);
}

// Delete task function
function removeElement(taskElement) {
    taskElement.remove();
    showToast("success", "Görev silindi.");
    updateLocalStorage();
}



// Add delete icon for existing tasks when page loads
function addCloseButtons() {
    let myNodelist = document.getElementsByTagName("li");
    for (let i = 0; i < myNodelist.length; i++) {
        let closeBtn = document.createElement("span");
        closeBtn.textContent = "x";
        closeBtn.className = "close";
        closeBtn.onclick = function() {
            removeElement(this.parentElement);
        };
        myNodelist[i].appendChild(closeBtn);
    }
}


addCloseButtons();

