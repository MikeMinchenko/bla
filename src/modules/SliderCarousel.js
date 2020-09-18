class SliderCarousel {
	constructor({ main, wrap, next, prev, infinity = false, position = 0, slidesToShow = 3, response = [] }) {
		if (!main || !wrap) {
			console.warn('slider-carousel: Необходимо передать "main" и "wrap"!');
		}
		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.slides = document.querySelector(wrap).children;
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
		this.slidesToShow = slidesToShow;
		this.options = {
			position,
			infinity,
			slideWidth: Math.floor(100 / this.slidesToShow)
		};
		this.response = response;
	}

	init() {
		this.addGloClases();
		this.addGloStyle();
		if (this.prev && this.next) {
			this.controlSlider();
		} else {
			this.addArrow();
			this.controlSlider();
		}
		if (this.response) {
			this.responseInit();
		}
	}

	addGloClases() {
		this.main.classList.add('glo-slider');
		this.wrap.classList.add('glo-slider__wrap');
		for (const item of this.slides) {
			item.classList.add('glo-slider__item');
		}
	}

	addGloStyle() {
		let style = document.querySelector('#sliderCarousel-style');

		if (!style) {
			style = document.createElement('style');
			style.id = 'sliderCarousel-style';
		}

		style.textContent = `
            .glo-slider {
                overflow: hidden !important;
            }

            .glo-slider__wrap {
                display: flex !important;
                transition: all 0.3s !important;
                will-change: transform !important;
            }

            .glo-slider__item {
                flex: 0 0 ${this.options.slideWidth}% !important;
                margin: auto 0 !important;
            }

            .glo-slider__prev,
            .glo-slider__next {
                margin: 0 10px;
                border: 20px solid transparent;
                background-color: transparent;
                outline: none
            }

            .glo-slider__prev {
                border-right-color: #19b5fe
            }

            .glo-slider__next {
                border-left-color: #19b5fe
            }

            .glo-slider__prev:hover,
            .glo-slider__next:hover,
            .glo-slider__prev:focus,
            .glo-slider__next:focus {
                outline: none;
                background-color: transparent
            }
        `;
		document.head.append(style);
	}

	controlSlider() {
		this.prev.addEventListener('click', this.prevSlider.bind(this));
		this.next.addEventListener('click', this.nextSlider.bind(this));
	}

	prevSlider() {
		if (this.options.infinity || this.options.position > 0) {
			--this.options.position;
			if (this.options.position < 0) {
				this.options.position = this.slides.length - this.slidesToShow;
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
		}
	}

	nextSlider() {
		if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
			++this.options.position;
			if (this.options.position > this.slides.length - this.slidesToShow) {
				this.options.position = 0;
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.slideWidth}%)`;
		}
	}

	addArrow() {
		this.prev = document.createElement('button');
		this.next = document.createElement('button');

		this.prev.className = 'glo-slider__prev';
		this.next.className = 'glo-slider__next';

		this.main.append(this.prev);
		this.main.append(this.next);
	}

	responseInit() {
		const slidesToShowDefault = this.slidesToShow,
			allResponse = this.response.map(item => item.breakpoint),
			maxResponse = Math.max(...allResponse);

		const checkResponse = () => {
			const withWindow = document.documentElement.clientWidth;

			if (withWindow < maxResponse) {
				for (let i = 0; i < allResponse.length; i++) {
					if (withWindow < allResponse[i]) {
						this.slidesToShow = this.response[i].slidesToShow;
						this.options.slideWidth = Math.floor(100 / this.slidesToShow);
						this.addGloStyle();
					}
				}
			} else {
				this.slidesToShow = slidesToShowDefault;
				this.options.slideWidth = Math.floor(100 / this.slidesToShow);
				this.addGloStyle();
			}
		};

		checkResponse();

		window.addEventListener('resize', checkResponse);
	}
}

export default SliderCarousel;
