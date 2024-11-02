// Pobranie elementów z DOM
const taskContainer = document.querySelector('.task_kontener');
const addTaskInput = document.getElementById('dodaj_task');
const addDateInput = document.querySelector('.task_dodawanie input[type="date"]');
const addButton = document.getElementById('bt_dodaj');
const searchInput = document.getElementById('szukaj');

// Funkcja do sprawdzenia poprawności nazwy i daty
function validateTask(name, date) {
    const now = new Date();
    const taskDate = new Date(date);
    return name.length >= 3 && name.length <= 255 && (!date || taskDate > now);
}

// Funkcja dodawania zadania do listy
function addTask(name, date) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task_item';

    // Tworzenie elementu zadania
    taskItem.innerHTML = `
        <span class="task_content">
            <input type="checkbox">
            <span class="task_text">${name}</span>
            <input type="date" value="${date}">
            <button class="delete_task">Usuń</button>
        </span>
    `;

    taskContainer.appendChild(taskItem);
    saveTasks();
}

// Obsługa przycisku dodawania
addButton.addEventListener('click', () => {
    const name = addTaskInput.value.trim();
    const date = addDateInput.value;

    if (validateTask(name, date)) {
        addTask(name, date);
        addTaskInput.value = '';
        addDateInput.value = '';
    } else {
        alert("Nazwa zadania musi mieć od 3 do 255 znaków, a data musi być pusta lub w przyszłości.");
    }
});

// Funkcja usuwania zadania
taskContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete_task')) {
        event.target.closest('.task_item').remove();
        saveTasks();
    }
});

// Funkcja edycji zadania po kliknięciu
taskContainer.addEventListener('click', (event) => {
    const taskItem = event.target.closest('.task_item');
    const taskText = taskItem.querySelector('.task_text');
    const taskDateInput = taskItem.querySelector('input[type="date"]');

    if (event.target.classList.contains('task_text')) {
        // Edycja tekstu zadania
        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.value = taskText.textContent;
        taskText.replaceWith(inputText);

        inputText.addEventListener('blur', () => {
            if (inputText.value.trim().length >= 3 && inputText.value.trim().length <= 255) {
                taskText.textContent = inputText.value;
                inputText.replaceWith(taskText);
                saveTasks();
            } else {
                alert("Nazwa zadania musi mieć od 3 do 255 znaków.");
                inputText.focus();
            }
        });

        inputText.focus();
    }
});

// Walidacja daty przy jej zmianie
taskContainer.addEventListener('change', (event) => {
    if (event.target.type === 'date') {
        const taskDateInput = event.target;
        const now = new Date();
        const newDate = new Date(taskDateInput.value);

        if (!taskDateInput.value || newDate > now) {
            saveTasks(); 
        } else {
            alert("Data musi być pusta lub w przyszłości.");
            taskDateInput.focus();
        }
    }
});

// Wyszukiwanie zadań
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    const tasks = document.querySelectorAll('.task_item');

    tasks.forEach(task => {
        const taskText = task.querySelector('.task_text').textContent.toLowerCase();
        
        if (query.length >= 2 && taskText.includes(query)) {
            task.style.display = 'block';
            highlightQuery(task.querySelector('.task_text'), query);
        } else if (query.length < 2) {
            task.style.display = 'block';
            removeHighlight(task.querySelector('.task_text'));
        } else {
            task.style.display = 'none';
        }
    });
});

// Funkcja do podświetlenia wyszukiwanej frazy
function highlightQuery(element, query) {
    const text = element.textContent;
    const regex = new RegExp(`(${query})`, 'gi');
    const highlightedText = text.replace(regex, '<mark>$1</mark>');
    element.innerHTML = highlightedText;
}

// Usunięcie podświetlenia
function removeHighlight(element) {
    element.innerHTML = element.textContent;
}

// Zapis i odczyt z Local Storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task_item').forEach(task => {
        const name = task.querySelector('.task_text').textContent;
        const date = task.querySelector('input[type="date"]').value;
        tasks.push({ name, date });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funkcja ładowania zadań z Local Storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTask(task.name, task.date));
}

// Dodanie zadań po załadowaniu strony
document.addEventListener('DOMContentLoaded', loadTasks);
