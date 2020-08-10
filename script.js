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
	budgetMonth = money + amount1 + amount2,
	budgetDay = Math.floor(budgetMonth / 30);

addExpenses = addExpenses.toLowerCase();

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.split(', '));
console.log('Бюджет на месяц ' + budgetMonth.toString());
console.log('Цель будет достигнута за: ' + Math.ceil(mission / budgetMonth) + ' месяцев');
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay > 1200) {
	console.log('У вас высокий уровень дохода');
} else if (600 < budgetDay && budgetDay < 1200) {
	console.log('У вас средний уровень дохода');
} else if (0 < budgetDay && budgetDay < 600) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
	console.log('Что то пошло не так');
}
