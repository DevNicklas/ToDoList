document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskModal = document.getElementById('taskModal');
    const closeBtn = document.querySelector('.closeBtn');
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    // Event listener for showing the modal to add a new task
    addTaskBtn.addEventListener('click', function() {
        taskModal.style.display = 'block';
    });

    // Event listener for closing the modal
    closeBtn.addEventListener('click', function() {
        taskModal.style.display = 'none';
        taskForm.reset();
    });

    // Event listener for clicking outside the modal to close it
    window.addEventListener('click', function(event) {
        if (event.target == taskModal) {
            taskModal.style.display = 'none';
            taskForm.reset();
        }
    });

    // Event listener for submitting the task form to add a new task
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const deadline = document.getElementById('deadline').value;

        if (title.trim() === '') {
            alert('Title is required!');
            return;
        }

        createTask(title, description, deadline);

        taskModal.style.display = 'none';
        taskForm.reset();
    });

    // Event listener for deleting a task
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteBtn')) {
            const taskToDelete = event.target.closest('.task');
            // Show a confirm modal before deleting the task
            if (confirm("Are you sure you want to delete this task?")) {
                taskToDelete.remove();
            }
        }

        // Event listener for editing a task
        if (event.target.classList.contains('editBtn')) {
            const taskToEdit = event.target.closest('.task');
            taskModal.style.display = 'block';

            // Populate the form fields with task details
            const taskTitle = taskToEdit.querySelector('h3').textContent;
            const taskDescription = taskToEdit.querySelector('p').textContent;
            const taskDeadline = taskToEdit.querySelectorAll('p')[1].textContent.split(': ')[1];

            document.getElementById('title').value = taskTitle;
            document.getElementById('description').value = taskDescription;
            document.getElementById('deadline').value = taskDeadline;

            const submitBtn = taskForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Save Changes';

            submitBtn.addEventListener('click', function() {
                // Update task details with new values
                taskToEdit.querySelector('h3').textContent = document.getElementById('title').value;
                taskToEdit.querySelector('p').textContent = document.getElementById('description').value;
                taskToEdit.querySelectorAll('p')[1].textContent = `Deadline: ${document.getElementById('deadline').value}`;

                taskModal.style.display = 'none';
                taskForm.reset();
                submitBtn.textContent = 'Add';
            });
        }
    });
});

// Function to create a new task
function createTask(title, description, deadline) {
    const taskList = document.getElementById('taskList');

    const task = document.createElement('div');
    task.classList.add('task');

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = description;

    const taskDeadline = document.createElement('p');
    taskDeadline.textContent = `Deadline: ${deadline}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.classList.add('deleteBtn');

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.classList.add('editBtn');

    task.appendChild(taskTitle);
    task.appendChild(taskDescription);
    task.appendChild(taskDeadline);
    task.appendChild(deleteBtn);
    task.appendChild(editBtn);

    taskList.appendChild(task);
}
