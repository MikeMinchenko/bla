'use strict';
// проверка на число
let isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};
// задаем вопрос про месячный доход
let money,
	start = function () {
		do {
			money = prompt('Ваш месячный доход?');
		} while (!isNumber(money));
	};

start();
// обьявление переменных
let income = 'фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
	deposit = confirm('Есть ли у вас депозит в банке ?'),
	mission = 1000000,
	period = 12,
	expenses = [],
	expensesAmounth,
	accumulatedMonth,
	budgetDay;

// функция подсчета обязательных расходов
let getExpensesMonth = function () {
	let sumData;
	let sum = 0;
	for (let i = 0; i < 2; i++) {
		expenses[i] = prompt('Введите обязательную статью расходов?');

		do {
			sumData = prompt('Во сколько это обойдется?');
		} while (!isNumber(sumData));

		sum += +sumData;
	}
	return sum;
};

// подсчет остатка за месяц
let getAccumulatedMonth = function () {
	return money - expensesAmounth;
};

// подсчет за сколько будет достигнута цель
let getTargetMonth = function () {
	let targetMonthResult = Math.ceil(mission / accumulatedMonth);
	if (targetMonthResult <= 0) {
		return 'Цель не будет достигнута';
	} else {
		return 'Цель будет достигнута за: ' + targetMonthResult + ' месяцев';
	}
};

// функция типа данных
let showTypeOf = function (data) {
	return typeof data;
};

// подсчет уровня дохода
let getStatusIncome = function () {
	if (budgetDay >= 1200) {
		return 'У вас высокий уровень дохода';
	} else if (600 <= budgetDay && budgetDay < 1200) {
		return 'У вас средний уровень дохода';
	} else if (0 < budgetDay && budgetDay < 600) {
		return 'К сожалению у вас уровень дохода ниже среднего';
	} else if (budgetDay <= 0) {
		return 'Что то пошло не так';
	}
};

// блок присвоения данных переменным
expensesAmounth = getExpensesMonth();
accumulatedMonth = getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth / 30);
addExpenses = addExpenses.toLowerCase();

// вывод в консоль
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы за месяц: ' + expensesAmounth);
console.log(addExpenses.split(', '));
console.log(getTargetMonth());
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome());