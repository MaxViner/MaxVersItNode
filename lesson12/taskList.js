let taskIdCounter = loadIdCounter();
 // Сохранение счетчика идентификаторов в локальное хранилище
function saveIdCounter() {
  localStorage.setItem('taskIdCounter', taskIdCounter);
}
 // Загрузка счетчика идентификаторов из локального хранилища
function loadIdCounter() {
  const savedIdCounter = localStorage.getItem('taskIdCounter');
  if (savedIdCounter) {
    return JSON.parse(savedIdCounter);
  } else {
    return 1;
  }
}
 // Отображение списка задач
function renderTaskList() {
  // Очистка содержимого body
  document.body.innerHTML = "";
   // HTML-код для отображения списка задач
  const html = `
  <section class="nav mb-2">
  <header>
      <h2 class="logo">
          ItNode
      </h2>
      <nav> 
          <ul> 
            <li><a href="#">Home</a></li> 
            <li><a href="#">About Us</a></li> 
            <li><a href="#">Contact Us</a></li> 
            <li><a href="#" id="switch-account-btn">Switch profile</a></li> 
          </ul>
      </nav>
  </header>
    <div class="container">
        <form id="task-form" class="d-flex">
            <input id="task-data" type="text" class="form-control me-1" placeholder="Введите название задачи">
            <input type="submit" class="btn btn-outline-success btn-vilet" value="Добавить">
        </form>
    </div>
  </section>
  <section class="tasks">
    <div class="container">
        <ul id="tasks-wrapper" class="list-group list-group-flush">
        </ul>
    </div>
  </section>`;
  // Вставка HTML-кода в body
  document.body.insertAdjacentHTML('afterbegin', html);
   // Получение текущего пользователя
  const currentUser = getCurrentUser();
  // Получение контейнера для задач
  const tasksWrapper = document.querySelector("#tasks-wrapper");
  // Если у текущего пользователя есть задачи, отобразить их
  if (currentUser && currentUser.tasks) {
    currentUser.tasks.forEach((task) => {
      tasksWrapper.appendChild(renderTask(task));
    });
  }
   // Обработка событий формы добавления задачи
  const taskForm = document.querySelector('#task-form');
   // Добавление задачи при отправке формы
  taskForm.addEventListener('submit', function (event) {
    // Отмена стандартного поведения формы
    event.preventDefault();
    // Получение значения поля ввода названия задачи
    const taskData = document.querySelector('#task-data');
    const taskTitle = taskData.value.trim();
    // Если название задачи не пустое...
    if (taskTitle !== '') {
      // Создание объекта новой задачи
      const newTask = {
        id: taskIdCounter++,
        title: taskTitle,
        description: "",
        img: "no-image.png",
      };
      // Добавление задачи для текущего пользователя
      addTaskToUser(newTask);
      // Отображение новой задачи
      tasksWrapper.appendChild(renderTask(newTask));
      // Очистка поля ввода названия задачи
      taskData.value = "";
      // Сохранение задач в локальном хранилище
      saveTasks();
      // Сохранение счетчика идентификаторов в локальном хранилище
      saveIdCounter();
    } else {
      // Вывод предупреждения, если название задачи пустое
      alert('Введите название задачи');
    }
  });
   // Обработка клика на стрелку для перехода к подробной информации о задаче
  tasksWrapper.addEventListener('click', function (event) {
    // Если клик был по стрелке...
    if (event.target.classList.contains('arrow-btn')) {
      // Получение идентификатора задачи и ее названия
      const id = event.target.parentElement.dataset.id;
      const taskTitle = event.target.parentElement.querySelector('.task-title').textContent;
      // Отображение подробной информации о задаче
      renderSwowTask(id, taskTitle);
    }
  });
   // Обработка клика по кнопке "Сменить профиль"
  const exBtn = document.querySelector("#switch-account-btn");
  exBtn.addEventListener('click', () => {
    logout(false);
  });
}
 // Отображение отдельной задачи
function renderTask(task) {
  console.log(task)
  // Получение текущего пользователя
  const currentUser = getCurrentUser();
  // Если у создателя задачи нет изображения, использовать изображение по умолчанию
  const img = task.image? task.image : 'default-task-image.jpg';
  console.log(img)
  // HTML-код для задачи
  const li = `  
    <div class="task-card" > 
      <div data-id='${task.id}' class="task task-card card rounded border-0 shadow p-3 h-100"> 
      <img src="${task.image || 'img/no-image.png'}" class="task-image card-img-top">
        <div class="card-body"> 
          <h5 class="task-title card-title fw-bold">${task.title}</h5> 
          <i class="arrow-btn bi bi-chevron-right"></i> 
        </div> 
      </div> 
    </div> ; `;
  // Возврат HTML-элемента задачи
  return createFromHTML(li);
}
 // Получение текущего пользователя из локального хранилища
function getCurrentUser() {
  const username = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || []; // убедиться, что "users" - массив
  // Возврат текущего пользователя или пустого объекта
  return users.find((user) => user.username === username) || {};
}
function createFromHTML(htmlString) { 
  const div = document.createElement('div'); 
  div.innerHTML = htmlString.trim(); 
  return div.firstChild; 
} 
 
// ========СОХРАНЕНИЕ В ЛОКАЛ СТОРАДЖ+++++++ 
function saveTasks() { 
  const currentUser = getCurrentUser(); 
  const users = JSON.parse(localStorage.getItem("users")) || []; 
  const userIndex = users.findIndex((user) => user.username === currentUser.username); 
  if (userIndex !== -1) { 
    users[userIndex].tasks = currentUser.tasks; 
    localStorage.setItem("users", JSON.stringify(users)); 
  } 
} 
 
function addUserToStorage(user) { 
  const users = JSON.parse(localStorage.getItem("users")) || []; 
  users.push(user); 
  localStorage.setItem("users", JSON.stringify(users)); 
} 
 
function updateUserInStorage(user) { 
  const users = JSON.parse(localStorage.getItem("users")) || []; 
  const userIndex = users.findIndex((userInfo) => userInfo.username === user.username); 
  if (userIndex !== -1) { 
    users[userIndex] = user; 
    localStorage.setItem("users", JSON.stringify(users)); 
  } 
} 
 
function addTaskToUser(task) { 
  const currentUser = getCurrentUser(); 
  currentUser.tasks = currentUser.tasks || []; 
  currentUser.tasks.push(task); 
  updateUserInStorage(currentUser); 
  saveTasks(); 
} 