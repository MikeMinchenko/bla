import CarouselSlider from './carouselSlider.js';

const designSliderTabs = () => {
	const slider = new CarouselSlider({
		main: '.nav.nav-designs',
		wrap: '#designs-list',
		prev: '#nav-arrow-designs_left',
		next: '#nav-arrow-designs_right',
		stylesId: 'js-nav-designs-slider-styles',
		styleClasses: {
			main: 'js-nav-designs-main--slider',
			wrap: 'js-nav-designs-wrap-slider',
			item: 'js-nav-designs__item-slider'
		},
		slidesToShow: 4,
		responsive: [
			{
				breakpoint: 1025,
				slideToShow: 3
			},
			{
				breakpoint: 755,
				slideToShow: 2
			},
			{
				breakpoint: 576,
				slideToShow: 1
			}
		]
	});

	slider.addStyle = function() {
		let style = document.getElementById(this.stylesId);
		const styleClasses = this.options.styleClasses;
		if (!style) {
			style = document.createElement('style');
			style.id = this.stylesId;
		}

		style.textContent = `
			@media (max-width: 1134px) {
				.${styleClasses.main} {
					overflow: hidden !important;
				}

				.${styleClasses.wrap} {
          display: flex !important;
          display: -ms-flexbox !important;
					transition: transform 0.5s !important;
				}

				.${styleClasses.item} {
					display: flex !important;
					align-items: center !important;
					margin: 0 auto !important;
					justify-content: center !important;
					flex: 0 0 ${this.options.widthSlide}% !important;
				}
				.${styleClasses.item} svg {
					left: unset;
				}
				#designs-list {
					min-width: 100%;
				}
			}
			@media (min-width: 1135px) {
				.${styleClasses.wrap} {
					transform: translateX(-0%) !important;
				}
			}
		`;

		document.head.append(style);
	};

	slider.init();
};

export default designSliderTabs;
