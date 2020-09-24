const itemPopup = item => {
	document.querySelectorAll('.active-item').forEach(item => item.classList.remove('active-item'));

	document.addEventListener('mouseover', event => {
		const elemTarget = event.target.closest(item),
			target = event.target.closest(`${item}__icon`);

		if (target) {
			elemTarget.classList.add('active-item');

			if (elemTarget.querySelector(`${item}-popup`).getBoundingClientRect().top < 0) {
				elemTarget.querySelector(`${item}-popup`).classList.add('popup-transform');
				elemTarget.querySelector(`${item}-popup`).style.top = `${elemTarget.offsetHeight + 10}px`;
				elemTarget.style.zIndex = `1`;
			}
		}
	});

	document.addEventListener('mouseout', event => {
		const elemTarget = event.target.closest(item),
			target = event.target.closest(`${item}__icon`);

		if (target) {
			elemTarget.classList.remove('active-item');
			elemTarget.querySelector(`${item}-popup`).classList.remove('popup-transform');
			elemTarget.querySelector(`${item}-popup`).removeAttribute('style');
			elemTarget.removeAttribute('style');
		}
	});
};

export default itemPopup;
