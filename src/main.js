import {generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip.js';

const POINT_COUNT = 22;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

// Rendering components to the page
const tripPresenter = new TripPresenter(siteHeaderElement, siteMainElement);

tripPresenter.init(points);
