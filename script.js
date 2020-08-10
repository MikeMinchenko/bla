// Первое задание
let lang = 'en';

if (lang === 'ru') {
	console.log([ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье' ]);
} else if (lang === 'en') {
	console.log([ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]);
} else {
	console.log('Укажите верное значение');
}

switch (lang) {
	case 'ru':
		console.log([ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье' ]);
		break;
	case 'en':
		console.log([ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]);
		break;
	default:
		console.log('Укажите верное значение');
		break;
}

let weekDay = {
	ru: [ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье' ],
	en: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]
};
console.log(weekDay[lang]);

// Второе задание
let namePerson = 'Максим',
	result =
		namePerson === 'Артем'
			? console.log('директор')
			: namePerson === 'Максим' ? console.log('преподаватель') : console.log('студент');
