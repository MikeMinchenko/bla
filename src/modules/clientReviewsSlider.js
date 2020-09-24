import CarouselSlider from './carouselSlider.js';

const clientReviewsSlider = () => {
	new CarouselSlider({
		main: '.reviews-slider',
		wrap: '.wrapper-for-slider',
		prev: '#reviews-arrow_left',
		next: '#reviews-arrow_right',
		stylesId: 'js-reviews-slider-style',
		slidesToShow: 1,
		styleClasses: {
			main: 'js-reviews-main-slider',
			wrap: 'js-reviews-wrap-slider',
			item: 'js-reviews-slider__item'
		}
	}).init();
};

export default clientReviewsSlider;
