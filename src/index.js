import togglePhone from './modules/togglePhone.js';
import togglePopups from './modules/togglePopups.js';
import smoothScroll from './modules/smoothScroll.js';
import maskPhone from './modules/maskPhone.js';
import itemPopup from './modules/itemPopup.js';

togglePhone();
togglePopups();
smoothScroll();
maskPhone('[name="phone"]');
itemPopup('.formula-item');
itemPopup('.problems-item');
