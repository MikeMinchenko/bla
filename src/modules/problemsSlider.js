import CarouselSlider from './carouselSlider.js';

const sliderProblems = () => {
	const slider = new CarouselSlider({
		main: '.problems-slider-wrap',
		wrap: '.problems-slider',
		prev: '#problems-arrow_left',
		next: '#problems-arrow_right',
		stylesId: 'js-problems-slider-styles',
		slidesToShow: 1,
		styleClasses: {
			main: 'js-problems-main-slider',
			wrap: 'js-problems-wrap-slider',
			item: 'js-problems-slider__item'
		},
		styles: `
		.js-problems-slider__item {
			justify-content: flex-start !important;
		}
		@media (max-width: 1024px) {
			.js-problems-slider__item {
				max-width: 100% !important;
			}
		}
		`
	});

	slider.init();
};

export default sliderProblems;
