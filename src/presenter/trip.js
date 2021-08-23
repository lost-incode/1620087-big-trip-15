import SiteMenuView from '../view/menu.js';
import TripInfoView from '../view/trip-info.js';
import TripCostView from '../view/trip-cost.js';
import TripFiltersView from '../view/filters.js';
import TripSortingView from '../view/sorting.js';
import EventsListView from '../view/events-list.js';
import NoPointView from '../view/no-point.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point.js';

export default class Trip {
  constructor(tripContainer, filterContainer, mainContainer, pointsContainer) {
    this._tripContainer = tripContainer;
    this._filterContainer = filterContainer;
    this._mainContainer = mainContainer;
    this._pointsContainer = pointsContainer;

    this._pointPresenter = new Map();

    this._menuComponent = new SiteMenuView();
    this._filterComponent = new TripFiltersView();

    this._listComponent = new EventsListView();
    this._sortComponent = new TripSortingView();
    this._noPointComponent = new NoPointView();

    // this._infoComponent = null;
    // this._costComponent = null;
  }

  init(points) {
    this._points = points.slice();
    this._infoComponent = new TripInfoView(points);
    this._costComponent = new TripCostView(points);

    this._renderTrip(points);
  }

  _renderMenu() {
    render(this._tripContainer, this._menuComponent);
  }

  _renderFilter() {
    render(this._filterContainer, this._filterComponent);
  }

  _renderInfo() {
    render(this._mainContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCost() {
    render(this._infoComponent, this._costComponent);
  }

  _renderSort() {
    render(this._pointsContainer, this._sortComponent);
  }

  _renderList() {
    render(this._pointsContainer, this._listComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderPoints() {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._pointsContainer, this._noPointComponent);
  }

  _renderTrip() {
    this._renderMenu();
    this._renderFilter();
    if (this._points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderInfo();
    this._renderCost();

    this._renderSort();
    this._renderList();
    this._renderPoints();
  }
}
