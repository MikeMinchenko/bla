'use strict';

let calculationButton = document.getElementById('start'),
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
  incomeItems = document.querySelectorAll('.income-items'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  targetAmount = document.querySelector('.target-amount'),
  periodRange = document.querySelector('[type="range"]'),
  periodАmount = document.querySelector('.period-amount');


// проверка на число
let isNumber = function (event) {
  event.target.value = event.target.value.replace(/\D/g, '');
};
// let isNumber = function (n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// };

let isText = function (event) {
  event.target.value = event.target.value.replace(/[^а-яА-Я ,]/g, '');
};
// let isText = function (value) {
//   return /[0-9]/g.test(value) || !isNaN(value);
// };






let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  start: function () {

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();

    // appData.getStatusIncome();
    // appData.getInfoDeposit();
    // appData.calcSaveMoney();
    appData.showResult();
  },
  // показываем результат
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSaveMoney();
    periodRange.addEventListener('input', function () {
      incomePeriodValue.value = appData.calcSaveMoney();
    });
  },
  // добавляем блок с дополнительным доходом
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.before(cloneIncomeItem, incomeButton);
    incomeItems = document.querySelectorAll('.income-items');
    appData.validation();
    if (incomeItems.length === 3) {
      incomeButton.style.display = 'none';
    }
  },
  // добавляем блок с обязательными расходами
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.before(cloneExpensesItem, expensesButton);
    expensesItems = document.querySelectorAll('.expenses-items');
    appData.validation();

    if (expensesItems.length === 3) {
      expensesButton.style.display = 'none';
    }
  },
  // добавляем значения в обьект с обязательными расходами
  getExpenses: function () {
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
      appData.validation();
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      } else {
        alert('Не все значения Обязательных расходов введены!');
      }
    });
  },
  // добавляем значения в обьект с Дополнительными доходами
  getIncome: function () {
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
      appData.validation();
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      } else {
        alert('Не все значения Дополнительных доходов введены!');
      }
    });
  },
  // вычисляем значения возможных расходов
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });

  },
  // вычисляем значения Дополнительных доходов
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });

  },
  // сумма обязательных расходов
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  // сумма дополнительных доходов
  getIncomeMonth: function () {
    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },
  // подсчет бюджета на день и месяц
  getBudget: function () {
    appData.budgetMonth = (appData.budget - appData.expensesMonth) + appData.incomeMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  // подсчет за сколько будет достигнута цель
  getTargetMonth: function () {
    let targetMonthResult = Math.ceil(targetAmount.value / appData.budgetMonth);
    if (targetMonthResult <= 0) {
      return 'Цель не будет достигнута';
    }
    return targetMonthResult;
  },
  // подсчет уровня дохода
  getStatusIncome: function () {
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой у Вас процент?');
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?');
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSaveMoney: function () {
    return appData.budgetMonth * periodRange.value;
  },
  // функция валидации полей ввода
  validation: function () {
    let sumPlaceholders = document.querySelectorAll('[placeholder="Сумма"]'),
      textPlaceholders = document.querySelectorAll('[placeholder="Наименование"]'),
      namePlaceholder = document.querySelectorAll('[placeholder="название"]');

    sumPlaceholders.forEach(item => {
      item.addEventListener('input', isNumber);
    });
    textPlaceholders.forEach(item => {
      item.addEventListener('input', isText);
    });
    namePlaceholder.forEach(item => {
      item.addEventListener('input', isText);
    });
  },

};

appData.validation();


// слушатели событий
periodRange.addEventListener('input', function () {
  periodАmount.textContent = periodRange.value;
});
incomeButton.addEventListener('click', appData.addIncomeBlock);
expensesButton.addEventListener('click', appData.addExpensesBlock);
calculationButton.addEventListener('click', function () {
  if (salaryAmount.value === '') {
    return;
  } else {
    appData.start();
  }
});