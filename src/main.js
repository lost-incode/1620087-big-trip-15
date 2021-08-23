// import SiteMenuView from './view/menu.js';
// import TripInfoView from './view/trip-info.js';
// import TripCostView from './view/trip-cost.js';
// import TripFiltersView from './view/filters.js';
// import TripSortingView from './view/sorting.js';
// import EventsListView from './view/events-list.js';
// import EditingFormView from './view/edit-form.js';
// import TripPointView from './view/trip-point.js';
// import NoPointView from './view/no-point.js';
import {generatePoint} from './mock/point.js';
// import {render, RenderPosition, replace} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import PointPresenter from './presenter/point.js';

const POINT_COUNT = 22;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

// Rendering components to the page
const tripPresenter = new TripPresenter(siteNavigationElement, siteTripFiltersElement, siteTripMainElement);

tripPresenter.init(points);

const pointPresenter = new PointPresenter(siteTripEventsElement);

pointPresenter.init(points);
// render(siteNavigationElement, new SiteMenuView());
// render(siteTripFiltersElement, new TripFiltersView());

// if (points.length === 0) {
//   render(siteTripEventsElement, new NoPointView());
// } else {
//   const siteInfoComponent = new TripInfoView(points);
//   render(siteTripMainElement, siteInfoComponent, RenderPosition.AFTERBEGIN);
//   render(siteInfoComponent, new TripCostView(points));

//   render(siteTripEventsElement, new TripSortingView());

//   const pointListComponent =  new EventsListView();
//   render(siteTripEventsElement, pointListComponent);

//   for (const point of points) {
//     renderPoint(pointListComponent, point);
//   }
// }


