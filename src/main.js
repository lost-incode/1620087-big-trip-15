import SiteMenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripFiltersView from './view/filters.js';
import TripSortingView from './view/sorting.js';
import EventsListView from './view/events-list.js';
import EditingFormView from './view/edit-form.js';
import TripPointView from './view/trip-point.js';
import {generatePoint} from './mock/task.js';
import {renderElement, RenderPosition} from './utils.js';

const ARRAYS_COUNT = 15;

const taskArray = [];

for (let i = 0; i < ARRAYS_COUNT; i++) {
  taskArray.push(generatePoint());
}

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

// Rendering components to the page
renderElement(siteNavigationElement, new SiteMenuView().getElement());
renderElement(siteTripMainElement, new TripInfoView(taskArray).getElement(), RenderPosition.AFTERBEGIN);

const siteTripInfoSection = siteTripMainElement.querySelector('.trip-main__trip-info');

renderElement(siteTripInfoSection, new TripCostView(taskArray).getElement());
renderElement(siteTripFiltersElement, new TripFiltersView().getElement());
renderElement(siteTripEventsElement, new TripSortingView().getElement());
renderElement(siteTripEventsElement, new EventsListView().getElement());

const siteTripEventsListElement = siteTripEventsElement.querySelector('.trip-events__list');

renderElement(siteTripEventsListElement, new EditingFormView(taskArray[0]).getElement());

for (const task of taskArray.slice(1)) {
  renderElement(siteTripEventsListElement, new TripPointView(task).getElement());
}
