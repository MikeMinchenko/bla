'use strict';
// !! блок с присвоением значений константам
// функция филтрации значений поля ввода с селектом (тип данных)
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	//функция в которй ищем все блоки dialog__response-block, создаем массив, перебираем и каждому присваиваем
	// атрибут style со значением display: none
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создаем массив из найденых значений
		responseBlocksArray.forEach(block => (block.style.display = 'none')); //перебираем и присваиваем атрибут style со значением display: none
	},
	// функция вывода сообщения в зависимости от переданных аттрибутов
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks(); // запускаем функцию перебора и присвоения
		document.querySelector(blockSelector).style.display = 'block'; // находим див с селектором и делаем его видимым
		if (spanSelector) {
			// если передали знаечение в атрибут то находим div с этим селектором и вставляем нужный текст
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// ф-я запускающая функцию вывода сообщения об ошибке
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// ф-я запускающая функцию вывода сообщения о том что все успешно
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// ф-я запускающая функцию вывода сообщения о том что результатов нет
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// ф-я выбора сообщения для вывода
	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(', '); // присвиваем запуск функции filterByType, и переводим значения в строку
			const alertMsg = valuesArray.length // в переменную записываем условие если строка имеет длинну
				? `Данные с типом ${type}: ${valuesArray}` // то выводим сообщение данные с типом type : данные полученные из filterByType
				: `Отсутствуют данные типа ${type}`; // если строка пустая то значение что данные с type отсутствуют
			showResults(alertMsg); // запуск ф-и показа результата с переданным сообщением
		} catch (e) {
			showError(`Ошибка: ${e}`); // если произошла ошибка запускаем ф-ю вывода сообщения об ошибке
		}
	};

const filterButton = document.querySelector('#filter-btn'); // находим кнопку фильтрации

filterButton.addEventListener('click', e => {
	// навешиваем обработчик по клику
	const typeInput = document.querySelector('#type'); // находим ипут с id type (селект)
	const dataInput = document.querySelector('#data'); // находим ипут с id data (данные от пользователя)

	if (dataInput.value === '') {
		// если инпут с данными пустой
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // показываем кастомное сообщение валидации
		showNoResults(); // запуск ф-и с выводом сообщения об отсутсвии результат
	} else {
		// иначе
		dataInput.setCustomValidity(''); // убираем сообщение из кастомного сообщения о валидации
		e.preventDefault(); // отменяем дефолтное поведение
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // запуск функции выбора сообщения и фильтрации результатов
	}
});
