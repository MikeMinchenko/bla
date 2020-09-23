const accordion = () => {
	const accordionBlock = document.querySelector('.accordion'),
		accordionLi = accordionBlock.querySelectorAll('li');

	accordionBlock.addEventListener('click', event => {
		const target = event.target.closest('li');

		accordionLi.forEach(item => {
			if (item.querySelector('.title_block').matches('.msg-active')) {
				item.querySelector('.title_block').classList.remove('msg-active');
			}
		});

		target.querySelector('.title_block').classList.add('msg-active');
	});
};

export default accordion;
