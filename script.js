'use strict';
// проверка на число
let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let isText = function(value) {
	return /[0-9]/g.test(value) || !isNaN(value);
};
// задаем вопрос про месячный доход
let money,
	start = function() {
		do {
			money = prompt('Ваш месячный доход?');
		} while (!isNumber(money));
	};

start();

let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	mission: 1000000,
	period: 12,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function() {
		let sumData, costItem;

		if (confirm('Есть ли у Вас дополнительный заработок?')) {
			let itemIncome, cashIncome;
			do {
				itemIncome = prompt('Какой у Вас дополнительный заработок?');
			} while (isText(itemIncome));
			do {
				cashIncome = prompt('Сколько вы на этом зарабатываете?');
			} while (!isNumber(cashIncome));
			appData.income[itemIncome] = +cashIncome;
		}

		do {
			appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
		} while (isText(appData.addExpenses));
		appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
		appData.deposit = confirm('Есть ли у вас депозит в банке ?');
		for (let i = 0; i < 2; i++) {
			costItem = prompt('Введите обязательную статью расходов?');

			do {
				sumData = prompt('Во сколько это обойдется?');
			} while (!isNumber(sumData));

			appData.expenses[costItem] = +sumData;
		}
	},
	// сумма обязательных расходов
	getExpensesMonth: function() {
		for (let key in appData.expenses) {
			appData.expensesMonth += appData.expenses[key];
		}
	},
	// подсчет бюджета на день и месяц
	getBudget: function() {
		appData.budgetMonth = money - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	// подсчет за сколько будет достигнута цель
	getTargetMonth: function() {
		let targetMonthResult = Math.ceil(appData.mission / appData.budgetMonth);
		if (targetMonthResult <= 0) {
			return 'Цель не будет достигнута';
		} else {
			return 'Цель будет достигнута за: ' + targetMonthResult + ' месяцев';
		}
	},
	// подсчет уровня дохода
	getStatusIncome: function() {
		if (appData.budgetDay >= 1200) {
			return 'У вас высокий уровень дохода';
		} else if (600 <= appData.budgetDay && appData.budgetDay < 1200) {
			return 'У вас средний уровень дохода';
		} else if (0 < appData.budgetDay && appData.budgetDay < 600) {
			return 'К сожалению у вас уровень дохода ниже среднего';
		} else if (appData.budgetDay <= 0) {
			return 'Что то пошло не так';
		}
	},
	getInfoDeposit: function() {
		if (appData.deposit) {
			do {
				appData.percentDeposit = prompt('Какой у Вас процент?');
			} while (!isNumber(appData.percentDeposit));
			do {
				appData.moneyDeposit = prompt('Какая сумма заложена?');
			} while (!isNumber(appData.moneyDeposit));
		}
	},
	calcSaveMoney: function() {
		return appData.budgetMonth * appData.period;
	}
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSaveMoney();

// вывод в консоль
console.log(appData.addExpenses.join(', '));
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('');
console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
	console.log(key + ': ' + appData[key]);
}
