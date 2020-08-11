'use strict';

let showText = function(a) {
	if (typeof a === 'string') {
		a = a.trim();
		if (a.length > 30) {
			a = a.slice(0, 30) + '...';
		}
		return a;
	} else {
		return 'в качестве аргумента передана не строка!!!';
	}
};

alert(showText(123));
