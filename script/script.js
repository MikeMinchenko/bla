'use strict';

let todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');

// массив со значениями Todo
let todoData = [];
// Запись в localStorage
let toLocalStorage = function () {
	let jsonTodoData = JSON.stringify(todoData);
	localStorage.setItem('data', jsonTodoData);
};
// Вытаскиваем значения из localStorage
let fromLocaleStorage = function () {
	if (localStorage.getItem('data')) {
		todoData = localStorage.getItem('data');
		todoData = JSON.parse(todoData);
	}
};
// Чтение страницы и вывод данных
let render = function () {
	todoList.textContent = '';
	todoCompleted.textContent = '';
	todoData.forEach(function (item) {
		let liElem = document.createElement('li');
		liElem.classList.add('todo-item');
		liElem.innerHTML =
			`<span class="text-todo">${item.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
      </div>`;
		if (item.completed) {
			todoCompleted.append(liElem);
		} else {
			todoList.append(liElem);
		}
		// перенос элементов в другой бло(выполнено, не выполнено)
		let btnComplete = liElem.querySelector('.todo-complete');

		btnComplete.addEventListener('click', function () {
			item.completed = !item.completed;
			render();
		});
		// удаление элементов
		let btnRemove = liElem.querySelector('.todo-remove');

		btnRemove.addEventListener('click', function () {
			let elem = this.closest('li');
			let elemIndex;
			for (let i in todoData) {

				if (todoData[i].value === elem.querySelector('.text-todo').textContent) {
					elemIndex = i;
				}
			}
			todoData.splice(elemIndex, 1);
			render();
		});


	});
	toLocalStorage();
};
// добавление элементов
todoControl.addEventListener('submit', function (event) {
	event.preventDefault();
	let newTodo = {
		value: headerInput.value,
		completed: false
	};
	if (newTodo.value === '') {
		event.preventDefault();
	} else {
		todoData.push(newTodo);
		headerInput.value = '';
		toLocalStorage();
		render();
	}

});

fromLocaleStorage();
render();