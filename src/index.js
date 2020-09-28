// полифилы
import 'dom-node-polyfills';
import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import 'mdn-polyfills/Node.prototype.append';
import 'mdn-polyfills/Node.prototype.remove';
import 'mdn-polyfills/Node.prototype.children';
import 'mdn-polyfills/Function.prototype.bind';
import 'cross-fetch/polyfill';
import 'formdata-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

// импорт модулей
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
import designSliderContent from './modules/designSliderContent.js';
import designSliderPopup from './modules/designSliderPopup.js';
import schemeSliderTabs from './modules/schemeSliderTabs.js';
import schemeSliderContent from './modules/schemeSliderContent.js';
import toggleTransparency from './modules/toggleTransparency.js';
import transparencySlider from './modules/transparencySlider.js';
import formulaSlider from './modules/formulaSlider.js';
import problemsSlider from './modules/problemsSlider.js';
import portfolioSlider from './modules/portfolioSlider.js';
import togglePortfolioPopup from './modules/togglePortfolioPopup.js';
import repaitTypesSlider from './modules/repaitTypesSlider.js';

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

designSliderContent();
designSliderPopup();
schemeSliderTabs();
schemeSliderContent();
toggleTransparency();
transparencySlider();
formulaSlider();
problemsSlider();
portfolioSlider();
togglePortfolioPopup();
repaitTypesSlider();
