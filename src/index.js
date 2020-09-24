import togglePhone from './modules/togglePhone.js';
import togglePopups from './modules/togglePopups.js';
import smoothScroll from './modules/smoothScroll.js';
import maskPhone from './modules/maskPhone.js';
import itemPopup from './modules/itemPopup.js';
import accordion from './modules/accordion.js';
import dataList from './modules/dataList.js';
import formValidate from './modules/formValidate.js';
import sendForm from './modules/sendForm.js';
import partnersSlider from './modules/partnersSlider.js';
import clientReviewsSlider from './modules/clientReviewsSlider.js';

togglePhone();
togglePopups();
smoothScroll();
maskPhone('[name="phone"]');
itemPopup('.formula-item');
itemPopup('.problems-item');
accordion();
dataList();
formValidate();
sendForm();

// слайдеры
partnersSlider();
clientReviewsSlider();
