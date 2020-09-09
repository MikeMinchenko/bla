'use strict';

// eslint-disable-next-line no-unused-vars
class Validator {
	constructor({ selector, pattern = {}, method }) {
		this.form = document.querySelector(selector);
		this.pattern = pattern;
		this.method = method;
		this.elementsForm = [ ...this.form.elements ].filter(
			(item) => item.tagName.toLowerCase() !== 'button' && item.type !== 'button'
		); // выбираем из формы только инпуты
		this.error = new Set();
	}

	init() {
		this.elementsForm.forEach((elem) => elem.addEventListener('change', this.chekIt.bind(this)));

		this.setPattern();

		this.form.addEventListener('submit', (e) => {
			this.elementsForm.forEach((elem) => this.chekIt({ target: elem }));
			if (this.error.size) {
				e.preventDefault();
			}
		});
	}

	isValid(elem) {
		const validatorMethod = {
			notEmpty(elem) {
				if (elem.value.trim() === '') {
					return false;
				}
				return true;
			},
			pattern(elem, pattern) {
				return pattern.test(elem.value);
			}
		};

		if (this.method) {
			const method = this.method[elem.id];

			if (method) {
				return method.every((item) => validatorMethod[item[0]](elem, this.pattern[item[1]]));
			}
		}

		return true;
	}

	chekIt(event) {
		const target = event.target;

		if (this.isValid(target)) {
			this.showSuccess(target);
			this.error.delete(target);
		} else {
			this.showError(target);
			this.error.add(target);
		}
	}

	showError(elem) {
		elem.classList.remove('success');
		elem.classList.add('error');
		elem.style.cssText = 'border: 1px solid red';

		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			return;
		}
		const errorDiv = document.createElement('div'); // создание дива с описанием ошибки
		errorDiv.textContent = 'Ошибка в этом поле';
		errorDiv.classList.add('validator-error');
		errorDiv.style.cssText = `
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
			font-size: 12px;
			font-family: sans-serif;
			color: red
    `;

		elem.insertAdjacentElement('afterend', errorDiv); // добавляем див с ошибкой под инпут
	}

	showSuccess(elem) {
		elem.classList.remove('error');
		elem.classList.add('success');
		elem.style.cssText = 'border: 1px solid green';
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
			elem.nextElementSibling.remove();
		}
	}

	setPattern() {
		this.pattern.phone = this.pattern.phone ? this.pattern.phone : /^(\+7)?8?([-()]*\d){10}$/;

		this.pattern.email = this.pattern.email ? this.pattern.email : /^\w+@\w+\.\w{2,}$/;
	}
}
