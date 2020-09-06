// Вводные данные
let inputTask = document.querySelector(".add_text");
let inputDate = document.querySelector(".add_date");
let buttonAddTask = document.querySelector(".add_button");

// Списки дел
let taskListTodo = document.querySelector(".task-todo");
let taskInProgress = document.querySelector(".task-in-progress");
let taskDone = document.querySelector(".task-done");

let taskItem = document.querySelectorAll(".task_item");
let taskText = document.querySelectorAll(".task_text");

let buttonClearAll = document.querySelectorAll('.button_clear');

// Модальные окна
let overlay = document.querySelector('.overlay');
let modal = document.querySelectorAll('.modal');
let buttonExit = document.querySelectorAll('.button_exit');
let buttonYes = document.querySelector('#yes');

// =====================================================================

// Добавляем элемент в список "Задачи"
buttonAddTask.addEventListener('click', function() {
    if(inputTask.value !== "" && inputDate.value !== "") {
        createNewTask(`${inputDate.value}`, `${inputTask.value}`);
        inputTask.value = "";
        inputDate.value = "";
    } else {
        modal[1].style.display = 'block';
        overlay.style.display = 'block';
    }
    
});

// добавляем действие для кнопки "Очистить все"
buttonClearAll.forEach(function(button){
    button.addEventListener('click', function(){
        // запрос на подтверждение для задачи в процессе
        if(button.id === 'button-clear-in-progress'){
            modal[0].style.display = 'block';
            overlay.style.display = 'block';
            buttonYes.addEventListener('click', function(){
                taskInProgress.innerHTML = '';
                modal[0].style.display = 'none';
                overlay.style.display = 'none';
            })
        } else if(button.id === 'button-clear-todo'){ 
            taskListTodo.innerHTML = '';
        }else{
            taskDone.innerHTML = '';
        }  
    });
});

// создаем новую задачу
function createNewTask(newDate, newTask) {
    let task = document.createElement('li');
    task.classList.add('task_item');
    taskListTodo.append(task);

    let taskText = document.createElement('p');
    taskText.classList.add('task_text');
    task.appendChild(taskText);
    taskText.append(newTask);

    let taskDate = document.createElement('p');
    taskDate.classList.add('task_date');
    taskDate.append(newDate);

    //  добавляем кнопки 
    let buttonArrowRight = document.createElement('span');
    buttonArrowRight.classList.add('arrow-right');

    let buttonTrash = document.createElement('span');
    buttonTrash.classList.add('trash');
    task.append(taskDate, taskText, buttonArrowRight, buttonTrash);

    // действие для кнопки удаления задачи
    buttonTrash.addEventListener('click', function(){
        // запрос на подтверждение удаления задачи
        if(buttonArrowRight.className === 'arrow-right-in-progress'){
            modal[0].style.display = 'block';
            overlay.style.display = 'block';
            buttonYes.addEventListener('click', function(){
                task.remove();
                modal[0].style.display = 'none';
                overlay.style.display = 'none';
            })
        } else {
            task.remove();
        }
    });

    // действие для кнопки перемещения задачи
   buttonArrowRight.addEventListener('click', function(event) {
       if (buttonArrowRight.className === 'arrow-right'){
        //    ограничение по количеству задач в процессе
            if(taskInProgress.children.length < 5){
                taskInProgress.append(task);
                buttonArrowRight.classList.remove('arrow-right');
                buttonArrowRight.classList.add('arrow-right-in-progress');
            }else{
                modal[2].style.display = 'block';
                overlay.style.display = 'block';
            }  
       } else if(buttonArrowRight.className === 'arrow-right-in-progress'){
           taskDone.append(task);
           buttonArrowRight.classList.remove('arrow-right-in-progress');
           buttonArrowRight.classList.add('arrow-left');
       }else {
           taskListTodo.append(task);
           buttonArrowRight.classList.remove('arrow-left');
           buttonArrowRight.classList.add('arrow-right');
       }
   })
  
}

// добавляем действие для кнопки закрытия модальных окон
buttonExit.forEach(function(item){
    item.addEventListener('click', function() {
        modal[0].style.display = 'none';
        modal[1].style.display = 'none';
        modal[2].style.display = 'none';
        overlay.style.display = 'none';
    });
});
        
   
    







