document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
      saveToDo(task.text, task.time);
    });
  });
  

// seleçao de elementos
const form = document.getElementById('form');
const inputTodo = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list')
const checkBtn = document.getElementById('checkBtn')
const deleteBtn = document.getElementById('deleteBtn')
const noneTodoSection = document.querySelector('.none-todo');

// FunÇões
const saveToDo = (texto, horario) => {
    const todos = document.createElement('div');
    todos.classList.add("todo");
  
    const label = document.createElement('label');
    label.classList.add('custom-checkbox-label');
    todos.appendChild(label);
  
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.classList.add('checkBtn');
    label.appendChild(input);
  
    const span = document.createElement('span');
    span.classList.add('custom-checkbox');
    label.appendChild(span);
  
    const divContentTodo = document.createElement('div');
    divContentTodo.classList.add('content-todo');
    todos.appendChild(divContentTodo);
  
    const h3 = document.createElement('h3');
    h3.innerHTML = `${texto} - Hora: ${horario}`;
    divContentTodo.appendChild(h3);
  
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('deleteBtn');
    btnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" ...';
    todos.appendChild(btnDelete);
  
    todoList.appendChild(todos);
    inputTodo.value = '';
    inputTodo.focus();
  
    updateTaskCount();
  };
  
  // Atualize o evento de envio do formulário para passar o horário
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const inputValue = inputTodo.value;
    const inputTime = document.getElementById('todo-time').value;
  
    if (inputValue && inputTime) {
      saveToDo(inputValue, inputTime);
      createNotification(inputValue, inputTime);
    }
  
    updateNoTasksSection();
  });
  

function updateNoTasksSection() {
    const todoItems = document.querySelectorAll('.todo');
    const noTasksSection = document.querySelector('.none-todo');
    const completedTodoItems = document.querySelectorAll('.custom-checkbox-label input[type="checkbox"]:checked');

    if (noTasksSection !== null) {
        if (todoItems.length > 0 || completedTodoItems.length > 0) {
            noTasksSection.style.display = 'none';
        } else {
            noTasksSection.style.display = 'flex';
        }
    }
}


function updateTaskCount() {
    const todoItems = document.querySelectorAll('.todo');
    const taskCount = document.getElementById('create-Counter');

    if (taskCount !== null) {
        taskCount.textContent = todoItems.length;
    }

}

function updateCompletedTaskCount() {
    const completedTodoItems = document.querySelectorAll('.custom-checkbox-label input[type="checkbox"]:checked');
    const completedTaskCount = document.getElementById('complete-Counter');

    if (completedTaskCount !== null) {
        completedTaskCount.textContent = completedTodoItems.length;
    }

}


// Eventos
form.addEventListener('submit', (e) => {
    e.preventDefault();


    const inputValue = inputTodo.value;

    if (inputValue) {
        saveToDo(inputValue);

    }

    updateNoTasksSection()
})

document.addEventListener('click', (e) => {

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");

    if (targetEl.classList.contains('checkBtn')) {
        parentEl.classList.toggle('checked-todo');

        if (parentEl.classList.contains('checked-todo')) {
            parentEl.style.textDecoration = 'line-through';
            parentEl.style.opacity = '0.7';
            parentEl.style.boxShadow = 'none';
            parentEl.style.border = 'none';
        } else {
            parentEl.style.textDecoration = 'none';
            parentEl.style.opacity = '1';
            parentEl.style.boxShadow = '0px 2px 8px 0px rgba(0, 0, 0, 0.06)';
            parentEl.style.border = ' 1px solid #333';
        }
        updateCompletedTaskCount()
    }

    if (targetEl.classList.contains('deleteBtn')) {
        parentEl.remove();
        updateTaskCount()
        updateCompletedTaskCount()
        updateNoTasksSection()
    }

})


const task = {
    text: texto,
    time: new Date(),
  };

  // Adicione a tarefa ao array das tarefas para não perder após atualização ou fechamento do app
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
;

function removeExpiredTasks() {
    const currentTime = new Date();
    const todoItems = document.querySelectorAll('.todo');
  
    todoItems.forEach((item) => {
      const taskTime = new Date(item.getAttribute('data-time'));
  
      if (currentTime - taskTime >= 24 * 60 * 60 * 1000) {
        // A tarefa expirou, então você pode remover a tarefa
        item.remove();
      }
    });
  
    updateTaskCount();
    updateCompletedTaskCount();
    updateNoTasksSection();
  }
  