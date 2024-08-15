const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const countValue = document.getElementById('count-value'); // Span for displaying total no. of tasks to be done
let taskCount = 0;

// Update the displayed task count
const updateTaskCount = () => {
    taskCount = listContainer.querySelectorAll('li:not(.checked)').length;
    countValue.innerHTML = taskCount;
}

// Function to add tasks that one has to be done before deadline
function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something");
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        
        // Adding edit button
        let editSpan = document.createElement('span');
        editSpan.innerHTML = "\u270E";  
        editSpan.classList.add('edit');
        editSpan.addEventListener('click', () => editTask(li));
        li.appendChild(editSpan);
        
        // Adding delete button
        let appSpan = document.createElement('span');
        appSpan.innerHTML = "\u00D7";  
        appSpan.classList.add('delete');
        li.appendChild(appSpan);
        
        listContainer.appendChild(li);
        updateTaskCount(); // Refresh task count
    }
    inputBox.value = ""; // Clear input field
    saveTasks(); // Save tasks to localStorage of browser
}

// Handle clicks on list items and delete buttons
listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        updateTaskCount(); // Refresh task count
        saveTasks(); // Save tasks to localStorage of browser
    } else if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        updateTaskCount(); // Refresh task count
        saveTasks(); // Save tasks to localStorage of browser
    }
}, false);

// Function editTask to modify the task, if it's changed
function editTask(li) {
    let currentText = li.childNodes[0].nodeValue;  // Get current task text
    let newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText.trim() !== '') {
        li.childNodes[0].nodeValue = newText; // Update task text
        saveTasks(); // Save tasks to localStorage
    }
}

function saveTasks() {
    localStorage.setItem("data", listContainer.innerHTML); // Store tasks in localStorage
}

function showAllTasks() {
    listContainer.innerHTML = localStorage.getItem("data") || ''; // Load all the tasks from localStorage
    updateTaskCount(); // Refresh task count
}

showAllTasks(); // Initializing the app
