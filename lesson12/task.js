// Функция для отображения страницы задачи
function renderSwowTask(id, Title) {
  // Очищаем всё содержимое body
  document.body.innerHTML = '';
  // Создаем верстку страницы для отображения задачи
  const TakVievPage =  `
    <section class="task-view">
      <div class="container">
      </div>
    </section>` ;
  // Вставляем верстку на страницу
  document.body.insertAdjacentHTML('afterbegin', TakVievPage);
  // Вызываем функцию для отображения подробной информации о задаче
  showTask(id, Title);
  // Добавляем обработчик событий input на страницу задачи
  document.querySelector('.task-view').addEventListener('input', function(event) {
    if (event.target.classList.contains('file-image')) {
      // Если пользователь загружает изображение, то отображаем его на странице
      const file = document.querySelector(".image-edit input").files[0];
      const img = document.querySelector('.task-image');
      const reader = new FileReader();
       reader.onload = function(e) {
        img.setAttribute('src', e.target.result);
      };
       reader.readAsDataURL(file);
    }
  });
}
 // Функция для отображения подробной информации о задаче
function showTask(id, Title) {
  // Получаем текущего пользователя
  const currentUser = getCurrentUser();
   // Если кнопка "стрелка" на задаче была нажата, то получаем название задачи
  if (event.target.classList.contains('arrow-btn')) {
    const taskTitle = event.target.parentElement.querySelector('.task-title').textContent;
     // Получаем задачу из currentUser.tasks по title
    const task = currentUser.tasks.find(task => task.title === taskTitle);
     // Создаем верстку для отображения информации о задаче
    var card =  `
      <div class="task-card ACTIVE card mx-auto" style="width: 21rem;">
        <div class="image-edit input-group mb-3">
          <!-- Кнопка для возврата к списку задач -->
          <a href="" id="back-btn"> <i class="bi bi-arrow-90deg-left" data-toggle="tooltip" title="вернуться к задачам"></i></a>
          <img src="${task.image || 'img/no-image.png'}" class="task-image card-img-top">
          <label class="" for="inputGroupFile01"><i class="bi bi-pencil"></i></label>
          <input type="file" class="d-none form-control file-image" id="inputGroupFile01">
        </div>
        <div class="card-body">
          <input type="text" class="task-title card-title form-control fst-italic" value="${taskTitle}" placeholder="Введите название задачи">
          <textarea class="task-desc card-text form-control mb-2" placeholder="Введите описание задачи">${task.description || ''}</textarea>
          <a href="#" class="btn btn-primary" id="save-task">save</a>
          <a href="#" class="btn btn-danger" id="delete-task">delete</a>
        </div>
      </div>` ;
    // Вставляем верстку в контейнер на странице задачи
    document.querySelector('.task-view .container').insertAdjacentHTML('beforeend', card);
    // Добавляем обработчик события для кнопки "назад"
    document.querySelector("#back-btn").addEventListener("click",function(e) {
      e.preventDefault();
      renderTaskList();
    });
    // Добавляем обработчик события для кнопки "сохранить"
    document.querySelector("#save-task").addEventListener("click", function(e) {
      e.preventDefault();
      // Получаем новое название задачи, новое описание и новое изображение
      const newTaskTitle = document.querySelector('.task-title').value;
      const newTaskDescription = document.querySelector('.task-desc').value;
      const newTaskImage = document.querySelector('.task-image').getAttribute('src');
      // Обновляем задачу в currentUser.tasks
      const updatedTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        image: newTaskImage
      };
      currentUser.tasks.forEach(function(task, index) {
        if (task.title === taskTitle) {
          currentUser.tasks[index] = updatedTask;
        }
      });
      // Обновляем текущего пользователя в localStorage
      updateUserInStorage(currentUser);
      // Вызываем функцию для сохранения задач в localStorage
      saveTasks();
      // Отображаем список задач
      renderTaskList();
    });
    // Добавляем обработчик события для кнопки "удалить"
    document.querySelector("#delete-task").addEventListener("click",function(e) {
      e.preventDefault();
      // Удаляем задачу из currentUser.tasks
      const currentUser = getCurrentUser();
      currentUser.tasks = currentUser.tasks.filter(task => task.title !== taskTitle);
      // Обновляем текущего пользователя в localStorage
      updateUserInStorage(currentUser);
      // Вызываем функцию для сохранения задач в localStorage
      saveTasks();
      // Отображаем список задач
      renderTaskList();
    });
  }
}
