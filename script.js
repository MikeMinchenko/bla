'use strict';
let firstTask = document.getElementById('task1'),
	secondTask = document.getElementById('task2'),
	secondTaskParagraph = secondTask.querySelectorAll('p');

// поиск цвета

const colorFind = (elem) => {
	let color;
	color = elem.match(/#[a-zA-Z0-9]+/gi);
	return console.log(...color);
};

colorFind(document.body.innerHTML);
// текст в кавычках в тег <mark>

const markFunc = (elem) => {
	return elem.replace(/".+"|«.+»/gi, (match) => `<mark>${match}</mark>`);
};

// первый вид ссылки
const linkFunc = (elem) => {
	return elem.replace(
		/http:\/\/\w+\.(\w+\.\w{1,3})\/.+\/|http:\/\/(.+\.\w{1,3})/g,
		(match, val1, val2) => `<a href="${match}">${val1 || val2}</a>`
	);
};

// первый блок

const firsFunc = () => {
	let newElem = firstTask.textContent.replace(/функц.{2}/gi, (match) => `<strong>${match}</strong>`);
	newElem = markFunc(newElem);
	newElem = linkFunc(newElem);

	firstTask.innerHTML = newElem;
};

firsFunc();

// второй блок

const secondFunc = () => {
	secondTaskParagraph.forEach((item) => {
		let newElem = item.textContent.replace(/\d{2}\:\d{2}/g, (match) => `<b>${match}</b>`);
		newElem = markFunc(newElem);
		newElem = linkFunc(newElem);

		item.innerHTML = newElem;
	});
};
secondFunc();
