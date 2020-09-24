import CarouselSlider from './carouselSlider.js';

const schemeSliderContent = () => {
	const buttons = document.querySelectorAll('#scheme-list .scheme-nav__item'),
		buttonHolder = document.querySelector('#scheme-list');

	const slider = new CarouselSlider({
		buttons: false,
		main: '.scheme-slider',
		wrap: '.wrapper-for-scheme-slider',
		stylesId: 'js-scheme-slider-wrap-style',
		styleClasses: {
			main: 'js-scheme-slider-maib-slider',
			wrap: 'js-scheme-slider-wrap-slider',
			item: 'js-scheme-slider__item-slider'
		},
		slidesToShow: 1
	});

	slider.textContent = document.querySelectorAll('.scheme-description-block');

	slider.toggleContent = function(index) {
		this.slides.forEach((slide, i) => {
			if (i === index) {
				this.textContent[i].classList.add('visible-content-block');
				this.wrap.style.transform = `translateX(-${this.options.widthSlide * i}%)`;
			} else {
				this.textContent[i].classList.remove('visible-content-block');
			}
		});
	};

	buttonHolder.addEventListener('click', event => {
		const target = event.target.closest('#scheme-list .scheme-nav__item');
		if (!target) return;

		buttons.forEach((button, index) => {
			if (button === target) {
				slider.toggleContent(index);
				button.classList.add('active');
			} else button.classList.remove('active');
		});
	});

	slider.init();
};

export default schemeSliderContent;
