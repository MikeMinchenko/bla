'use strict';

let money = +prompt('Ваш месячный доход?'),
	income = 'фриланс',
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
	deposit = confirm('Есть ли у вас депозит в банке ?'),
	mission = 1000000,
	period = 12,
	expenses1 = prompt('Введите обязательную статью расходов?'),
	amount1 = +prompt('Во сколько это обойдется?'),
	expenses2 = prompt('Введите обязательную статью расходов?'),
	amount2 = +prompt('Во сколько это обойдется?'),
	getExpensesMonth = function() {
		return amount1 + amount2;
	},
	getAccumulatedMonth = function() {
		return money - getExpensesMonth();
	},
	accumulatedMonth = getAccumulatedMonth(),
	getTargetMonth = function() {
		return Math.ceil(mission / accumulatedMonth);
	},
	budgetDay = Math.floor(accumulatedMonth / 30),
	showTypeOf = function(data) {
		return typeof data;
	};

addExpenses = addExpenses.toLowerCase();

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы за месяц: ' + getExpensesMonth());
console.log(addExpenses.split(', '));
console.log('Цель будет достигнута за: ' + getTargetMonth() + ' месяцев');
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
