import {createSiteMenuTemplate} from './view/menu.js';
import {createSiteTripInfoTemplate} from './view/trip-info.js';
import {createSiteTripCostTemplate} from './view/trip-cost.js';
import {createSiteTripFiltersTemplate} from './view/filters.js';
import {createSiteTripSortingTemplate} from './view/sorting.js';
import {createSiteTripEventsListTemplate} from './view/events-list.js';
import {createSiteEditFormTemplate} from './view/edit-form.js';
import {createSiteTripPointTemplate} from './view/trip-point.js';
import {generateTask} from './mock/task.js';
import {renderTemplate} from './utils.js';

const ARRAYS_COUNT = 15;

const taskArray = [];

for (let i = 0; i < ARRAYS_COUNT; i++) {
  taskArray.push(generateTask());
}

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

// Rendering components to the page
renderTemplate(siteNavigationElement, createSiteMenuTemplate());
renderTemplate(siteTripMainElement, createSiteTripInfoTemplate(taskArray), 'afterbegin');

const siteTripInfoSection = siteTripMainElement.querySelector('.trip-main__trip-info');

renderTemplate(siteTripInfoSection, createSiteTripCostTemplate(taskArray));
renderTemplate(siteTripFiltersElement, createSiteTripFiltersTemplate());
renderTemplate(siteTripEventsElement, createSiteTripSortingTemplate());
renderTemplate(siteTripEventsElement, createSiteTripEventsListTemplate());

const siteTripEventsListElement = siteTripEventsElement.querySelector('.trip-events__list');

renderTemplate(siteTripEventsListElement, createSiteEditFormTemplate(taskArray[0]));

for (const task of taskArray.slice(1)) {
  renderTemplate(siteTripEventsListElement, createSiteTripPointTemplate(task));
}
