import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import 'mdn-polyfills/Node.prototype.append';
import 'mdn-polyfills/Node.prototype.remove';
import 'cross-fetch/polyfill';
import 'formdata-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import countTimer from './modules/countTimer';
import toogleMenu from './modules/toogleMenu';
import tooglePopup from './modules/tooglePopup';
import tabs from './modules/tabs';
import scroll from './modules/scroll';
import slider from './modules/slider';
import changeImage from './modules/changeImage';
import calculator from './modules/calculator';
import sendForm from './modules/sendForm';

// таймер
countTimer('2 september 2020');
// меню
toogleMenu();
// модальное окно
tooglePopup();
// табы
tabs();
// скролл до элемента
scroll();
// слайдер
slider();
// изменнение картинок в блоке наша команда
changeImage();
// калькулятор
calculator(100);
// Ajax отправка на сервер
const forms = document.querySelectorAll('form');

forms.forEach(item => {
	sendForm(item);
});
