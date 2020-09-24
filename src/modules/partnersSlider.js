import CarouselSlider from './carouselSlider.js';

const partnersSlider = () => {
	new CarouselSlider({
		main: '.partners .wrapper',
		wrap: '.partners .partners-slider',
		prev: '#partners-arrow_left',
		next: '#partners-arrow_right',
		slidesToShow: 3,
		stylesId: 'js-partners-style-slider',
		responsive: [
			{
				breakpoint: 1024,
				slideToShow: 2
			},
			{
				breakpoint: 768,
				slideToShow: 1
			}
		],
		styleClasses: {
			main: 'js-partners-main_slider',
			wrap: 'js-partners-wrap_slider',
			item: 'js-partners-slider__item',
			prev: 'js-partners-slider__prev',
			next: 'js-partners-slider__next'
		}
	}).init();
};

export default partnersSlider;
