document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage on page load
    loadTasks();

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);
        saveTasks();
        taskInput.value = '';
    }

    // Function to create a new list item
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#x2715;'; // Unicode for a simple 'X'
        deleteBtn.className = 'delete-btn';
        
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the list item click event from firing
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        taskList.appendChild(li);
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(task => {
            tasks.push({
                text: task.textContent.replace('✕', '').trim(), // Clean up the text
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.text;

                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '&#x2715;';
                deleteBtn.className = 'delete-btn';
                
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    li.remove();
                    saveTasks();
                });

                if (task.completed) {
                    li.classList.add('completed');
                }

                li.appendChild(deleteBtn);
                taskList.appendChild(li);
            });
        }
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});