'use strict';

const calculationButton = document.getElementById('start'),
	resetBtn = document.getElementById('cancel'),
	incomeButton = document.getElementsByTagName('button')[0],
	expensesButton = document.getElementsByTagName('button')[1],
	depositCheck = document.querySelector('#deposit-check'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	value = document.getElementsByClassName('result-total'),
	budgetMonthValue = value[0],
	budgetDayValue = value[1],
	expensesMonthValue = value[2],
	additionalIncomeValue = value[3],
	additionalExpensesValue = value[4],
	incomePeriodValue = value[5],
	targetMonthValue = value[6],
	salaryAmount = document.querySelector('.salary-amount'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodRange = document.querySelector('[type="range"]'),
	periodАmount = document.querySelector('.period-amount'),
	checkInput = document.querySelector('#deposit-check'),
	depositBank = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent');


let incomeItems = document.querySelectorAll('.income-items'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	textInputs = document.querySelectorAll('[type="text"]');


// let isNumber = function (n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// };


// let isText = function (value) {
//   return /[0-9]/g.test(value) || !isNaN(value);
// };

class AppData {
	constructor() {
		this.income = {};
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.incomeMonth = 0;

	}

	// получить Cookies
	getCookie(name) {
		let matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURI(matches[1]) : undefined;
	}
	// установить Cookies
	setCookie(name, value, options = {}) {

		options = {
			path: '/',
		};

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}

		let updatedCookie = encodeURI(name) + "=" + encodeURI(value);

		for (let optionKey in options) {
			updatedCookie += "; " + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += "=" + optionValue;
			}
		}

		document.cookie = updatedCookie;
		localStorage.setItem(name, value);
	}
	// удалить cookies
	deleteCookie(name) {
		const cookieDate = new Date();
		cookieDate.setTime(cookieDate.getTime() - 1);
		document.cookie = name += "=; expires=" + cookieDate.toGMTString();
	}

	// массив из CoociesNames
	cookiesNames() {
		const cookiesNames = document.cookie.split("; ").map((item) => {
			const to = item.search('=');
			const newstr = item.substring(0, to);
			return newstr;
		});
		return cookiesNames;
	}

	// показываем результ из хранилища
	showLocalResult() {

		const localNames = [];
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			localNames.push(key);
		}
		console.log(this.cookiesNames());
		localNames.forEach((item) => {
			console.log(item);
			if (!this.cookiesNames().includes(item) && this.cookiesNames().length >= 1) {
				this.cookiesNames().forEach((item) => {
					this.deleteCookie(item);
				});
				localStorage.clear();
			}
		});

		if (localStorage.length !== 0) {
			textInputs.forEach((item) => {
				item.setAttribute("disabled", "true");
			});
			calculationButton.style.display = 'none';
			resetBtn.style.display = 'block';
			incomeButton.setAttribute("disabled", "true");
			expensesButton.setAttribute("disabled", "true");
			checkInput.setAttribute("disabled", "true");
			depositBank.setAttribute("disabled", "true");
		}

		budgetMonthValue.value = localStorage.getItem('budgetMonthValue');
		budgetDayValue.value = localStorage.getItem('budgetDayValue');
		expensesMonthValue.value = localStorage.getItem('expensesMonthValue');
		additionalExpensesValue.value = localStorage.getItem('additionalExpensesValue');
		additionalIncomeValue.value = localStorage.getItem('additionalIncomeValue');
		targetMonthValue.value = localStorage.getItem('targetMonthValue');
		incomePeriodValue.value = localStorage.getItem('incomePeriodValue');
	}
	// проверка на число
	isNumber(event) {
		event.target.value = event.target.value.replace(/\D/g, '');
	}
	// проверка на текст
	isText(event) {
		event.target.value = event.target.value.replace(/[^а-яА-Я ,]/g, '');
	}
	// функция при нажатии на кнопку Расчитать
	start() {

		if (salaryAmount.value === '') {
			return;
		}
		textInputs = document.querySelectorAll('[type="text"]');
		textInputs.forEach((item) => {
			item.setAttribute("disabled", "true");
		});
		calculationButton.style.display = 'none';
		resetBtn.style.display = 'block';
		incomeButton.setAttribute("disabled", "true");
		expensesButton.setAttribute("disabled", "true");
		checkInput.setAttribute("disabled", "true");
		depositBank.setAttribute("disabled", "true");


		this.budget = +salaryAmount.value;

		this.getInExp();
		this.getExpensesMonth();
		this.getIncomeMonth();
		this.getInfoDeposit();
		this.getBudget();
		this.getAddInExp();

		this.showResult();



		this.setCookie('budgetMonthValue', budgetMonthValue.value);
		this.setCookie('budgetDayValue', budgetDayValue.value);
		this.setCookie('expensesMonthValue', expensesMonthValue.value);
		this.setCookie('additionalIncomeValue', additionalIncomeValue.value);
		this.setCookie('additionalExpensesValue', additionalExpensesValue.value);
		this.setCookie('incomePeriodValue', incomePeriodValue.value);
		this.setCookie('targetMonthValue', targetMonthValue.value);
		this.setCookie('isLoad', true);

	}
	// показываем результат
	showResult() {

		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSaveMoney();
		periodRange.addEventListener('input', () => {
			incomePeriodValue.value = this.calcSaveMoney();
		});
	}

	// добавление полей по нажатию на +
	addInExpBlock(btn) {
		const itemStr = btn.closest('div').className;
		let items = document.querySelectorAll(`.${itemStr}-items`);
		const cloneItem = items[0].cloneNode(true);
		cloneItem.querySelector(`.${itemStr}-title`).value = '';
		cloneItem.querySelector(`.${itemStr}-amount`).value = '';
		btn.before(cloneItem);
		items = document.querySelectorAll(`.${itemStr}-items`);
		this.validation();
		if (items.length === 3) {
			btn.style.display = 'none';
		}

	}

	// добавляем значения в обьект с обязательными расходами и дополнительными доходами
	getInExp() {
		incomeItems = document.querySelectorAll('.income-items');
		expensesItems = document.querySelectorAll('.expenses-items');

		const count = (item) => {
			const itemStr = item.className.split('-')[0];
			const itemTitle = item.querySelector(`.${itemStr}-title`).value,
				itemAmount = item.querySelector(`.${itemStr}-amount`).value;
			this.validation();
			if (itemTitle !== '' && itemAmount !== '') {
				this[itemStr][itemTitle] = +itemAmount;
			}
		};

		incomeItems.forEach(count);
		expensesItems.forEach(count);
	}

	// вычисляем и записываем в массив значения возможных доходов и расходов
	getAddInExp() {
		const addExpensesItems = additionalExpensesItem.value.split(',');
		const addIncomeItems = [];

		additionalIncomeItem.forEach((item) => {
			addIncomeItems.push(item.value);
		});

		const count = (item, index, arr) => {
			item = item.trim();
			if (item !== '') {
				if (arr === addExpensesItems) {
					this.addExpenses.push(item);
				} else if (arr === addIncomeItems) {
					this.addIncome.push(item);
				}
			}
		};
		addExpensesItems.forEach(count);
		addIncomeItems.forEach(count);
	}


	// сумма обязательных расходов
	getExpensesMonth() {

		for (const key in this.expenses) {
			this.expensesMonth += this.expenses[key];
		}

	}

	// сумма дополнительных доходов
	getIncomeMonth() {

		for (const key in this.income) {
			this.incomeMonth += this.income[key];
		}
	}

	// подсчет бюджета на день и месяц
	getBudget() {
		const monthDeposit = this.percentDeposit * (this.moneyDeposit / 100);
		this.budgetMonth = (this.budget - this.expensesMonth) + this.incomeMonth + monthDeposit;
		this.budgetDay = Math.floor(this.budgetMonth / 30);

	}

	// подсчет за сколько будет достигнута цель
	getTargetMonth() {
		const targetMonthResult = Math.ceil(targetAmount.value / this.budgetMonth);
		if (targetMonthResult <= 0) {
			return 'Цель не будет достигнута';
		}

		return targetMonthResult;

	}

	// подсчет уровня дохода
	getStatusIncome() {
		if (this.budgetDay >= 1200) {
			return 'У вас высокий уровень дохода';
		} else if (600 <= this.budgetDay && this.budgetDay < 1200) {
			return 'У вас средний уровень дохода';
		} else if (0 < this.budgetDay && this.budgetDay < 600) {
			return 'К сожалению у вас уровень дохода ниже среднего';
		} else if (this.budgetDay <= 0) {
			return 'Что то пошло не так';
		}

	}
	// меняем процент в зависимости от банка
	chandgePercent() {
		const selectValue = this.value;
		if (selectValue === 'other') {
			depositPercent.style.display = 'inline-block';
			depositPercent.removeAttribute('disabled');
			depositPercent.value = '';
		} else {
			depositPercent.style.display = 'none';
			depositPercent.value = selectValue;
		}
	}
	//  получаем данные от пользователя по процентам и вкладу
	getInfoDeposit() {

		if (this.deposit) {
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
		}

	}
	// действия при input.checked
	depositHandler() {
		if (checkInput.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			this.validation();
			depositBank.addEventListener('change', this.chandgePercent);
			depositPercent.addEventListener('input', this.isNumber);
			depositPercent.addEventListener('input', () => {
				if (depositPercent.value > 100 || depositPercent.value < 1) {
					alert('Веденное число должно быть от 1 до 100');
					depositPercent.value = '';
				}
			});

		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositBank.value = '0';
			depositAmount.value = '';
			this.deposit = false;
			depositPercent.value = '';
			depositBank.removeEventListener('change', this.chandgePercent);
			depositPercent.removeEventListener('input', this.isNumber);
			depositPercent.removeEventListener('input', () => {
				if (depositPercent.value > 100 || depositPercent.value < 1) {
					alert('Веденное число должно быть от 1 до 100');
					depositPercent.value = '';
				}
			});
		}

	}

	calcSaveMoney() {
		return this.budgetMonth * periodRange.value;
	}

	// функция валидации полей ввода
	validation() {
		const sumPlaceholders = document.querySelectorAll('[placeholder="Сумма"]'),
			textPlaceholders = document.querySelectorAll('[placeholder="Наименование"]'),
			namePlaceholder = document.querySelectorAll('[placeholder="название"]');

		sumPlaceholders.forEach((item) => {
			item.addEventListener('input', this.isNumber);
		});
		textPlaceholders.forEach((item) => {
			item.addEventListener('input', this.isText);
		});
		namePlaceholder.forEach((item) => {
			item.addEventListener('input', this.isText);
		});

	}

	// сброс
	reset() {
		textInputs.forEach((item) => {
			item.removeAttribute("disabled");
			item.value = '';
		});
		calculationButton.style.display = 'block';
		resetBtn.style.display = 'none';
		incomeButton.removeAttribute("disabled");
		expensesButton.removeAttribute("disabled");
		checkInput.removeAttribute("disabled");
		depositBank.removeAttribute("disabled");
		periodRange.value = 1;
		periodАmount.textContent = periodRange.value;
		this.budgetMonth = '';
		this.income = {};
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.budget = 0;
		this.budgetDay = 0;
		this.expensesMonth = 0;
		this.incomeMonth = 0;
		incomeItems.forEach((item) => {
			incomeItems = document.querySelectorAll('.income-items');
			if (incomeItems.length > 1) {
				item.remove();
			} else if (incomeItems.length < 3) {
				incomeButton.style.display = 'block';
			}

		});
		expensesItems.forEach((item) => {
			expensesItems = document.querySelectorAll('.expenses-items');
			if (expensesItems.length > 1) {
				item.remove();
			} else if (expensesItems.length < 3) {
				incomeButton.style.display = 'block';
			}
		});

		checkInput.checked = false;
		this.depositHandler();
		this.cookiesNames().forEach((item) => {
			this.deleteCookie(item);
		});
		localStorage.clear();
	}

	// слушатели событий
	eventListeners() {
		this.validation();
		this.showLocalResult();

		periodRange.addEventListener('input', () => {
			periodАmount.textContent = periodRange.value;
		});
		incomeButton.addEventListener('click', () => {
			this.addInExpBlock(incomeButton);
		});
		expensesButton.addEventListener('click', () => {
			this.addInExpBlock(expensesButton);
		});

		calculationButton.addEventListener('click', this.start.bind(this));
		resetBtn.addEventListener('click', this.reset.bind(this));
		checkInput.addEventListener('change', this.depositHandler.bind(this));
	}
}


const appData = new AppData();
appData.eventListeners();