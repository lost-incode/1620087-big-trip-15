import {createSiteMenuTemplate} from './view/menu.js';
import {createSiteTripInfoTemplate} from './view/trip-info.js';
import {createSiteTripCostTemplate} from './view/trip-cost.js';
import {createSiteTripFiltersTemplate} from './view/filters.js';
import {createSiteTripSortingTemplate} from './view/sorting.js';
import {createSiteTripEventsListTemplate} from './view/events-list.js';
import {createSiteEditFormTemplate} from './view/edit-form.js';
import {createSiteTripPointTemplate} from './view/trip-point.js';
import {generateTask} from './mock/task.js';

const ARRAYS_COUNT = 15;

const taskArray = [];

for (let i = 0; i < ARRAYS_COUNT; i++) {
  taskArray.push(generateTask());
}
// console.log(taskArray)
const render = (container, template, place='beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

// Rendering components to the page
render(siteNavigationElement, createSiteMenuTemplate());
render(siteTripMainElement, createSiteTripInfoTemplate(taskArray), 'afterbegin');

const siteTripInfoSection = siteTripMainElement.querySelector('.trip-main__trip-info');

render(siteTripInfoSection, createSiteTripCostTemplate(taskArray));
render(siteTripFiltersElement, createSiteTripFiltersTemplate());
render(siteTripEventsElement, createSiteTripSortingTemplate());
render(siteTripEventsElement, createSiteTripEventsListTemplate());

const siteTripEventsListElement = siteTripEventsElement.querySelector('.trip-events__list');

render(siteTripEventsListElement, createSiteEditFormTemplate(taskArray[0]));

for (const task of taskArray.slice(1)) {
  render(siteTripEventsListElement, createSiteTripPointTemplate(task));
}
