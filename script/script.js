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
	periodАmount = document.querySelector('.period-amount');
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
		textInputs.forEach(function (item) {
			item.setAttribute("disabled", "true");
		});
		calculationButton.style.display = 'none';
		resetBtn.style.display = 'block';
		incomeButton.setAttribute("disabled", "true");
		expensesButton.setAttribute("disabled", "true");
		periodRange.setAttribute("disabled", "true");

		this.budget = +salaryAmount.value;

		this.getInExp();
		this.getExpensesMonth();
		this.getIncomeMonth();
		this.getBudget();
		// this.getAddExpenses();
		// this.getAddIncome();
		this.getAddInExp();

		this.showResult();
	}
	// показываем результат
	showResult() {
		const _this = this;
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcSaveMoney();
		periodRange.addEventListener('input', function () {
			incomePeriodValue.value = _this.calcSaveMoney();
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
		const _this = this;
		additionalIncomeItem.forEach((item) => {
			addIncomeItems.push(item.value);
		});

		console.log(addExpensesItems);
		console.log(addIncomeItems);

		const count = function (item, index, arr) {
			item = item.trim();
			if (item !== '') {
				if (arr === addExpensesItems) {
					_this.addExpenses.push(item);
				} else if (arr === addIncomeItems) {
					_this.addIncome.push(item);
				}
			}
		};
		addExpensesItems.forEach(count);
		addIncomeItems.forEach(count);
	}


	// сумма обязательных расходов
	getExpensesMonth() {
		const _this = this;
		for (const key in this.expenses) {
			_this.expensesMonth += _this.expenses[key];
		}

	}

	// сумма дополнительных доходов
	getIncomeMonth() {
		const _this = this;
		for (const key in this.income) {
			_this.incomeMonth += _this.income[key];
		}
	}

	// подсчет бюджета на день и месяц
	getBudget() {
		this.budgetMonth = (this.budget - this.expensesMonth) + this.incomeMonth;
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

	getInfoDeposit() {
		const _this = this;
		if (this.deposit) {
			do {
				_this.percentDeposit = prompt('Какой у Вас процент?');
			} while (!this.isNumber(this.percentDeposit));
			do {
				_this.moneyDeposit = prompt('Какая сумма заложена?');
			} while (!this.isNumber(this.moneyDeposit));
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
		textInputs.forEach(function (item) {
			item.removeAttribute("disabled");
			item.value = '';
		});
		calculationButton.style.display = 'block';
		resetBtn.style.display = 'none';
		incomeButton.removeAttribute("disabled");
		expensesButton.removeAttribute("disabled");
		periodRange.removeAttribute("disabled");
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
		incomeItems.forEach(function (item) {
			incomeItems = document.querySelectorAll('.income-items');
			if (incomeItems.length > 1) {
				item.remove();
			} else if (incomeItems.length < 3) {
				incomeButton.style.display = 'block';
			}

		});
		expensesItems.forEach(function (item) {
			expensesItems = document.querySelectorAll('.expenses-items');
			if (expensesItems.length > 1) {
				item.remove();
			} else if (expensesItems.length < 3) {
				incomeButton.style.display = 'block';
			}
		});

	}

	// слушатели событий
	eventListeners() {
		const _this = this;
		periodRange.addEventListener('input', () => {
			periodАmount.textContent = periodRange.value;
		});
		incomeButton.addEventListener('click', () => {
			this.addInExpBlock(incomeButton);
		});
		expensesButton.addEventListener('click', () => {
			this.addInExpBlock(expensesButton);
		});

		calculationButton.addEventListener('click', this.start.bind(_this));
		resetBtn.addEventListener('click', this.reset.bind(_this));
	}
}


const appData = new AppData();
appData.validation();
appData.eventListeners();