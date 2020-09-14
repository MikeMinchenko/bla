document.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const select = document.getElementById('cars'),
		output = document.getElementById('output');

	const getData = () => {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', './cars.json');
			request.setRequestHeader('Content-type', 'application/json');
			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}

				if (request.status === 200) {
					const data = JSON.parse(request.responseText);
					resolve(data);
				} else {
					reject(request.status);
					output.innerHTML = 'Произошла ошибка';
				}
			});
			request.send();
		});
	};

	const outputData = data => {
		data.cars.forEach(item => {
			if (item.brand === select.value) {
				console.log(select.value);
				const { brand, model, price } = item;
				output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
			}
		});
	};

	select.addEventListener('change', () => {
		getData().then(outputData).catch(error => console.log(error));
	});
});
