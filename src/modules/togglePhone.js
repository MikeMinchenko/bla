const togglePhone = () => {
	const headerContactsArrow = document.querySelector('.header-contacts__arrow'),
		headerContactsAcord = document.querySelector('.header-contacts__phone-number-accord');

	headerContactsArrow.addEventListener('click', () => {
		headerContactsAcord.classList.toggle('header-accord-active');
		headerContactsArrow.classList.toggle('header-accord-arrow-active');
	});
};

export default togglePhone;
