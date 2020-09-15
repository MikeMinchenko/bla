'use strict';

const convert = () => {
	const firstInput = document.getElementById('first_input'),
		secondInput = document.getElementById('second_input'),
		firstSelect = document.getElementById('first_select'),
		secondSelect = document.getElementById('second_select'),
		convertBtn = document.getElementById('button');

	const addToSelect = data => {
		for (let key in data) {
			firstSelect.insertAdjacentHTML(
				'beforeend',
				`
					<option value='${data[key]}'>${key}</option>
				`
			);
			secondSelect.insertAdjacentHTML(
				'beforeend',
				`
					<option value='${data[key]}'>${key}</option>
				`
			);
		}
	};

	const doConvert = () => {
		convertBtn.addEventListener('click', () => {
			if (firstSelect.value !== '') {
				secondInput.value = (firstInput.value / firstSelect.value * secondSelect.value).toFixed(2);
			}
		});
	};

	fetch('https://api.exchangeratesapi.io/latest')
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.rates;
		})
		.then(data => {
			addToSelect(data);
			doConvert();
		});
};

convert();
