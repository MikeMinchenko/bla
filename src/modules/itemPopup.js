const itemPopup = item => {
	document.addEventListener('mouseover', event => {
		const target = event.target.closest(item);

		if (target) {
			target.classList.add('active-item');
			if (target.querySelector(`${item}-popup`).getBoundingClientRect().top < 0) {
				target.querySelector(`${item}-popup`).classList.add('popup-transform');
				target.querySelector(`${item}-popup`).style.top = `${target.offsetHeight + 10}px`;
				target.style.zIndex = `1`;
			}
		}
	});

	document.addEventListener('mouseout', event => {
		const target = event.target.closest(item);

		if (target) {
			target.classList.remove('active-item');
			target.querySelector(`${item}-popup`).classList.remove('popup-transform');
			target.querySelector(`${item}-popup`).removeAttribute('style');
			target.removeAttribute('style');
		}
	});
};

export default itemPopup;
