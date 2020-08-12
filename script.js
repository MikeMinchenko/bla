'use strict';

let arr = [];

arr.push('258', '354', '681', '445', '217', '905', '759');

console.log(arr.filter((num) => [ '2', '4' ].includes(num.toString()[0])));

let n = 100;

for (let i = 2; i <= n; i++) {
	let point = 1;
	for (let j = 2; j <= i / 2 && point === 1; j++) {
		if (i % j === 0) {
			point = 0;
		}
	}
	if (point === 1) {
		console.log(i + ' - Делители этого числа: 1 и ' + i);
	}
}
