'use strict';

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
	income = 'фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
	deposit = confirm('Есть ли у вас депозит в банке ?'),
	mission = 1000000,
	period = 12,
	expenses = [];

let start = function() {
	do {
		money = prompt('Ваш месячный доход?');
	} while (!isNumber(money));
};

start();

let getExpensesMonth = function() {
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

let expensesAmounth = getExpensesMonth();

let getAccumulatedMonth = function() {
	return money - expensesAmounth;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
	let targetMonthResult = Math.ceil(mission / accumulatedMonth);
	if (targetMonthResult <= 0) {
		return 'Цель не будет достигнута';
	} else {
		return 'Цель будет достигнута за: ' + targetMonthResult + ' месяцев';
	}
};

let budgetDay = Math.floor(accumulatedMonth / 30);

let showTypeOf = function(data) {
	return typeof data;
};

addExpenses = addExpenses.toLowerCase();

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы за месяц: ' + expensesAmounth);
console.log(addExpenses.split(', '));
console.log(getTargetMonth());
console.log('Бюджет на день: ' + budgetDay);

let getStatusIncome = function() {
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

console.log(getStatusIncome());
