const tabs = () => {
	const tabHeader = document.querySelector('.service-header'),
		tab = tabHeader.querySelectorAll('.service-header-tab'),
		tabContent = document.querySelectorAll('.service-tab');

	tabHeader.addEventListener('click', event => {
		let target = event.target;
		target = target.closest('.service-header-tab');

		if (target) {
			tab.forEach((item, i) => {
				if (item === target) {
					item.classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					item.classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			});
		}
	});
};

export default tabs;
