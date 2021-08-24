import TripInfoView from '../view/trip-info.js';
import TripCostView from '../view/trip-cost.js';
import TripSortingView from '../view/sorting.js';
import NoPointView from '../view/no-point.js';
import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import PointPresenter from './point.js';
import FilterPresenter from './filter.js';
import MenuPresenter from './menu.js';
import ListPresenter from './list.js';

export default class Trip {
  constructor(menuContainer, filterContainer, mainContainer, pointsContainer) {
    this._menuContainer = menuContainer;
    this._filterContainer = filterContainer;
    this._mainContainer = mainContainer;
    this._pointsContainer = pointsContainer;

    this._pointPresenter = new Map();

    this._sortComponent = new TripSortingView();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._infoComponent = new TripInfoView(points);
    this._costComponent = new TripCostView(points);

    this._renderTrip(points);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this.__points = updateItem(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderMenu() {
    const menuPresenter = new MenuPresenter(this._menuContainer);
    menuPresenter.init();
  }

  _renderFilter() {
    const filterPresenter = new FilterPresenter(this._filterContainer);
    filterPresenter.init();
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
    const listPresenter = new ListPresenter(this._pointsContainer);
    listPresenter.init();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handlePointChange, this._handleModeChange);
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
