const scroll = () => {
	const anchors = document.querySelectorAll('a[href*="#"]');

	for (const anchor of anchors) {
		anchor.addEventListener('click', event => {
			event.preventDefault();

			const blockID = anchor.getAttribute('href'),
				idElem = document.querySelector(blockID);
			if (idElem) {
				const idElemY = idElem.offsetTop;
				window.scrollTo({
					top: idElemY,
					behavior: 'smooth'
				});
			}
		});
	}
};

export default scroll;
