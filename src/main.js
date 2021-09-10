import {generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
// import {render} from './utils/render.js';

const POINT_COUNT = 22;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const filterContainer = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

// Rendering components to the page
const tripPresenter = new TripPresenter(siteHeaderElement, siteMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

filterPresenter.init();

// render(filterContainer, new TripFiltersView(filters, 'all'));

tripPresenter.init();
