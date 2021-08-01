import {createSiteMenuTemplate} from './view/menu.js';
import {createSiteTripInfoTemplate} from './view/trip-info.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');

render(siteNavigationElement, createSiteMenuTemplate(), 'beforeend');
render(siteTripMainElement, createSiteTripInfoTemplate(), 'afterbegin');
