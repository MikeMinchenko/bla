import CarouselSlider from './carouselSlider.js';

const schemeSliderTabs = () => {
	const slider = new CarouselSlider({
		main: '#scheme .nav',
		wrap: '#scheme-list',
		prev: '#nav-arrow-scheme_left',
		next: '#nav-arrow-scheme_right',
		stylesId: 'js-scheme-list-style',
		slidesToShow: 4,
		responsive: [
			{
				breakpoint: 1024,
				slideToShow: 3
			},
			{
				breakpoint: 646,
				slideToShow: 2
			},
			{
				breakpoint: 576,
				slideToShow: 1
			}
		],
		styleClasses: {
			main: 'js-scheme-list-main-slider',
			wrap: 'js-scheme-list-wrap-slider',
			item: 'js-scheme-list__item-slider'
		}
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
				#scheme-list {
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

export default schemeSliderTabs;
