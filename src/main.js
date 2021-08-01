import {createSiteMenuTemplate} from './view/menu.js';
import {createSiteTripInfoTemplate} from './view/trip-info.js';
import {createSiteTripCostTemplate} from './view/trip-cost.js';
import {createSiteTripFiltersTemplate} from './view/filters.js';
import {createSiteTripSortingTemplate} from './view/sorting.js';
import {createSiteTripEventsListTemplate} from './view/events-list.js';
import {createSiteAddFormTemplate} from './view/add-form.js';
import {createSiteEditFormTemplate} from './view/edit-form.js';
import {createSiteTripPointTemplate} from './view/trip-point.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');


render(siteNavigationElement, createSiteMenuTemplate(), 'beforeend');
render(siteTripMainElement, createSiteTripInfoTemplate(), 'afterbegin');

const siteTripInfoSection = siteTripMainElement.querySelector('.trip-main__trip-info');

render(siteTripInfoSection, createSiteTripCostTemplate(), 'beforeend');
render(siteTripFiltersElement, createSiteTripFiltersTemplate(), 'beforeend');
render(siteTripEventsElement, createSiteTripSortingTemplate(), 'beforeend');
render(siteTripEventsElement, createSiteTripEventsListTemplate(), 'beforeend');

const siteTripEventsListElement = siteTripEventsElement.querySelector('.trip-events__list');
render(siteTripEventsListElement, createSiteEditFormTemplate(), 'beforeend');
render(siteTripEventsListElement, createSiteAddFormTemplate(), 'beforeend');
render(siteTripEventsListElement, createSiteTripPointTemplate(), 'beforeend');
render(siteTripEventsListElement, createSiteTripPointTemplate(), 'beforeend');
render(siteTripEventsListElement, createSiteTripPointTemplate(), 'beforeend');
