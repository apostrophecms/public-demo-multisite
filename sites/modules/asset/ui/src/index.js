import localToggle from './_locales.js';
import modeToggle from './_dark-light-switch.js';
import mobileMenu from './_mobile.js';
import savePrefs from './_set-save-prefs.js';
import demoButtons from './_demo-buttons.js';

export default () => {
  localToggle();
  modeToggle();
  mobileMenu();
  savePrefs();
  demoButtons();
};
