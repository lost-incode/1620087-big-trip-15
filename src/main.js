import {createSiteMenuTemplate} from './view/menu.js';
import {createSiteTripInfoTemplate} from './view/trip-info.js';
import {createSiteTripCostTemplate} from './view/trip-cost.js';
import {createSiteTripFiltersTemplate} from './view/filters.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');

render(siteNavigationElement, createSiteMenuTemplate(), 'beforeend');
render(siteTripMainElement, createSiteTripInfoTemplate(), 'afterbegin');
const siteTripInfoSection = siteTripMainElement.querySelector('.trip-main__trip-info');
render(siteTripInfoSection, createSiteTripCostTemplate(), 'beforeend');
render(siteTripFiltersElement, createSiteTripFiltersTemplate(), 'beforeend');
