import SiteMenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripFiltersView from './view/filters.js';
import TripSortingView from './view/sorting.js';
import EventsListView from './view/events-list.js';
import EditingFormView from './view/edit-form.js';
import TripPointView from './view/trip-point.js';
import {generatePoint} from './mock/task.js';
import {render, RenderPosition} from './utils.js';

const POINT_COUNT = 22;

const renderPoint = (pointListElement, point) => {
  const pointComponent = new TripPointView(point);
  const pointEditComponent = new EditingFormView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointComponent.getElement());
};

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteTripEventsElement = siteMainElement.querySelector('.trip-events');

// Rendering components to the page
render(siteNavigationElement, new SiteMenuView().getElement());

const siteInfoComponent = new TripInfoView(points);
render(siteTripMainElement, siteInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

render(siteInfoComponent, new TripCostView(points).getElement());
render(siteTripFiltersElement, new TripFiltersView().getElement());
render(siteTripEventsElement, new TripSortingView().getElement());

const pointListComponent =  new EventsListView();
render(siteTripEventsElement, pointListComponent.getElement());

for (const point of points) {
  renderPoint(pointListComponent.getElement(), point);
}
