'use strict';

class Todo {

	constructor(form, input, todoList, todoComleted) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoComleted = document.querySelector(todoComleted);
		this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
		this.todoContainer = document.querySelector('.todo-container');

	}

	addToStorage() {
		localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
	}

	// возможность редактирования тудушек
	editing(elem) {
		const elemKey = elem.getAttribute('key');
		this.todoData.forEach(item => {

			if (item.key === elemKey) {
				item.value = elem.textContent.trim();
				item.contenteditable = !item.contenteditable;
			}

		});

		this.render();
	}

	// обработчик клика по кнопкам внутри li и по клавише enter
	handler() {

		this.todoContainer.addEventListener('click', e => {
			const target = e.target;

			if (target.matches('.todo-remove')) {
				this.deleteItem(target.closest('li'));
			} else if (target.matches('.todo-complete')) {
				this.completedItem(target.closest('li'));
			} else if (target.matches('.todo-edit')) {
				this.editing(target.closest('li'));
			}

		});

		this.todoContainer.addEventListener('keydown', e => {
			if (e.key === 'Enter') {
				e.preventDefault();
				this.editing(e.target.closest('li'));
			}
		});
	}

	// фунция удаления элементов
	deleteItem(elem) {
		const elemKey = elem.getAttribute('key');
		this.todoData.forEach((item, index) => {
			if (item.key === elemKey) {
				this.todoData.delete(index);
			}
		});
		this.render();
	}

	// добавляем элемент в список комплит
	completedItem(elem) {
		const elemKey = elem.getAttribute('key');
		this.todoData.forEach(item => {

			if (item.key === elemKey) {
				item.completed = !item.completed;
			}

		});

		this.render();
		// перебираем todo data и меняем значение completed
	}

	// перерисовка страницы
	render() {
		this.todoList.textContent = '';
		this.todoComleted.textContent = '';
		this.addToStorage();
		this.todoData.forEach(this.createItem.bind(this));
	}

	createItem(item) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.setAttribute('key', item.key);
		li.setAttribute('contenteditable', item.contenteditable);
		li.insertAdjacentHTML('beforeend', `
			<span class="text-todo">${item.value}</span>
			<div class="todo-buttons">
				<button class="todo-edit"></button>
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
		`);

		if (item.completed) {
			this.todoComleted.append(li);
		} else {
			this.todoList.append(li);
		}
	}

	addTodo(e) {

		e.preventDefault();

		if (this.input.value.trim() !== '') {
			const newTodo = {
				value: this.input.value,
				completed: false,
				key: this.generateKey(),
				contenteditable: false
			};

			this.todoData.set(newTodo.key, newTodo);
			this.render();
		} else {
			alert('Поле должно не должно быть пустым!');
		}

		this.input.value = '';


	}

	generateKey() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}


	init() {
		this.form.addEventListener('submit', this.addTodo.bind(this));
		this.render();
		this.handler();
	}
}


const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();