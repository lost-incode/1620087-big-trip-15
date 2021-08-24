import {generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip.js';

const POINT_COUNT = 22;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

// Rendering components to the page
const tripPresenter = new TripPresenter(siteNavigationElement, siteTripFiltersElement, siteTripMainElement, siteTripEventsElement);

tripPresenter.init(points);
