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
        createNewTask(inputDate.value, inputTask.value);
        inputReset();
    } else {
        modal[1].style.display = 'block';
        overlay.style.display = 'block';
    }
});


// создаем новую задачу
function createNewTask(date, text) {
    let task = document.createElement('li');
    task.classList.add('task_item');
    taskListTodo.append(task);

    let textBox = document.createElement('div');
    textBox.classList.add('text_box');
    task.append(textBox);

    let buttonBox = document.createElement('div');
    buttonBox.classList.add('button_box');
    task.append(buttonBox);

    let taskText = document.createElement('p');
    taskText.classList.add('task_text');
    taskText.append(document.createTextNode(text));
    textBox.append(taskText);

    let taskDate = document.createElement('p');
    taskDate.classList.add('task_date');
    taskDate.append(document.createTextNode(dateReverse(date)));
    textBox.append(taskDate);

    //  добавляем кнопки 
    let buttonArrowRight = document.createElement('span');
    buttonArrowRight.classList.add('arrow-right');

    let buttonTrash = document.createElement('span');
    buttonTrash.classList.add('trash');
    buttonBox.append(buttonArrowRight, buttonTrash);
    

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
   
// изменяем чтение формата даты   
function dateReverse(date){
	let newDate = date.split('-');
	return newDate.reverse().join('-');
}

// функция очистки полей
function inputReset(){
    inputTask.value = "";
    inputDate.value = "";
    return;
}
