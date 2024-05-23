// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskModal = document.getElementById('taskModal');
    const closeBtn = document.querySelector('.closeBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function() {
        taskModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        taskModal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function() {
        taskModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == taskModal) {
            taskModal.style.display = 'none';
        }
    });

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const deadline = document.getElementById('deadline').value;

        if (title.trim() === '') {
            alert('Titel er påkrævet!');
            return;
        }

        const task = document.createElement('div');
        task.classList.add('task');

        const taskTitle = document.createElement('h3');
        taskTitle.textContent = title;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = description;

        const taskDeadline = document.createElement('p');
        taskDeadline.textContent = `Deadline: ${deadline}`;

        task.appendChild(taskTitle);
        task.appendChild(taskDescription);
        task.appendChild(taskDeadline);

        taskList.appendChild(task);

        taskModal.style.display = 'none';
        taskForm.reset();
    });
});
