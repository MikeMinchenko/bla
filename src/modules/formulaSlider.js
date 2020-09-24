import CarouselSlider from './carouselSlider.js';

const formulaSlider = () => {
	const slider = new CarouselSlider({
		main: '.formula-slider-wrap',
		wrap: '.formula-slider',
		prev: '#formula-arrow_left',
		next: '#formula-arrow_right',
		stylesId: 'js-formula-slider-styles',
		slidesToShow: 1,
		styleClasses: {
			main: 'js-formula-main-slider',
			wrap: 'js-formula-wrap-slider',
			item: 'js-formula-slider__item'
		},
		styles: `
		.js-formula-slider__item {
			justify-content: flex-start !important;
		}
		`
	});

	slider.init();
};

export default formulaSlider;
