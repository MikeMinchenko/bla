import animate from './animate';

const calculator = (price = 100) => {
	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totlalValue = document.getElementById('total');

	calcBlock.addEventListener('input', e => {
		const target = e.target;

		if (target.matches('[type="text"]')) {
			target.value = target.value.replace(/\D/g, '');
		}
	});

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		const typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (+calcDay.value !== 0) {
			if (calcDay.value && +calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && +calcDay.value < 10) {
				dayValue *= 1.5;
			}
		}

		if (typeValue && squareValue) {
			total = price * typeValue * squareValue * countValue * dayValue;
		}

		animate({
			duration: 300,
			timing(timeFraction) {
				return timeFraction;
			},
			draw(progress) {
				totlalValue.textContent = Math.floor(progress * total);
			}
		});
	};

	calcBlock.addEventListener('change', e => {
		const target = e.target;

		if (target.matches('select') || target.matches('input')) {
			countSum();
		}
	});
};

export default calculator;
