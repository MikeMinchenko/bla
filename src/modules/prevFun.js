const prevFun = function(value) {
	--this.options.position;
	this.wrap.style.transform = `translateX(-${this.options.position *
		(value ? this.options.widthSlide / this.slides.length : this.options.widthSlide)}%)`;
	this.next.style.visibility = '';
	if (this.options.position === 0) this.prev.style.visibility = 'hidden';
};

export default prevFun;
