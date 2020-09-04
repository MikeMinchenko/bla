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
	// анимация удаления
	animDel(elem) {
		let count = 100;
		const step = 5;

		const deleteAnim = () => {
			count -= step;
			elem.style.opacity = count / 100;

			if (count > 0) {
				requestAnimationFrame(deleteAnim);
			}
		};
		requestAnimationFrame(deleteAnim);
	}

	animAdd(elem) {
		let count = 0; //getComputedStyle('opacity');
		const step = 5;

		const addAnim = () => {
			count += step;
			elem.style.opacity = count / 100;

			if (count < 100) {
				requestAnimationFrame(addAnim);
			}
		};
		requestAnimationFrame(addAnim);
	}
	// добавление в local storage
	addToStorage() {
		localStorage.setItem('todoList', JSON.stringify([ ...this.todoData ]));
	}

	// возможность редактирования тудушек
	editing(elem) {
		this.todoData.forEach((item) => {
			if (item.key === elem.key) {
				item.value = elem.textContent.trim();
				item.contenteditable = !item.contenteditable;
			}
		});
		this.render();
	}

	// обработчик клика по кнопкам внутри li и по клавише enter
	handler() {
		this.todoContainer.addEventListener('click', (e) => {
			const target = e.target,
				element = target.closest('li');

			if (target.matches('.todo-remove')) {
				this.animDel(element);
				this.deleteItem(element);
			} else if (target.matches('.todo-complete')) {
				this.animDel(element);

				setTimeout(() => {
					this.completedItem(element);
				}, 500);

				setTimeout(() => {
					this.animAdd(element);
				}, 600);
			} else if (target.matches('.todo-edit')) {
				this.editing(element);
			}
		});

		this.todoContainer.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				this.editing(e.target.closest('li'));
			}
		});
	}

	// фунция удаления элементов
	deleteItem(elem) {
		this.todoData.forEach((item, index) => {
			if (item.key === elem.key) {
				this.todoData.delete(index);
			}
		});
		setTimeout(() => {
			this.render();
		}, 500);
	}

	// добавляем элемент в список комплит
	completedItem(elem) {
		this.todoData.forEach((item) => {
			if (item.key === elem.key) {
				item.completed = !item.completed;
				this.addToStorage();

				if (!item.completed) {
					this.todoList.insertAdjacentElement('beforeend', elem);
				} else {
					this.todoComleted.insertAdjacentElement('beforeend', elem);
				}
			}
		});

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
		li.key = item.key;

		li.insertAdjacentHTML(
			'beforeend',
			`
			<span class="text-todo">${item.value}</span>
			<div class="todo-buttons">
				<button class="todo-edit"></button>
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
		`
		);
		li.querySelector('.text-todo').setAttribute('contenteditable', item.contenteditable);

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
