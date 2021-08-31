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
import {sortTime, sortPrice, sortDefault} from '../utils/point.js';
import {SortType} from '../const.js';

export default class Trip {
  constructor(siteHeaderElement, siteMainElement) {
    this._menuContainer = siteHeaderElement.querySelector('.trip-controls__navigation');
    this._mainContainer = siteHeaderElement.querySelector('.trip-main');
    this._filterContainer = this._mainContainer.querySelector('.trip-controls__filters');
    this._pointsContainer = siteMainElement.querySelector('.trip-events');
    this._currentSortType = SortType.DEFAULT;

    this._pointPresenter = new Map();

    this._sortComponent = new TripSortingView();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._listPresenter = new ListPresenter(this._pointsContainer);
  }

  init(points) {
    this._points = points.slice();
    this._sortPoints(this._currentSortType);
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

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DEFAULT:
        this._points.sort(sortDefault);
        break;
      case SortType.TIME:
        this._points.sort(sortTime);
        break;
      case SortType.PRICE:
        this._points.sort(sortPrice);
        break;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPoints();
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
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderList() {
    this._listPresenter.init();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listPresenter.listComponent, this._handlePointChange, this._handleModeChange);
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
