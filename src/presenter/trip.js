import TripInfoView from '../view/trip-info.js';
import TripCostView from '../view/trip-cost.js';
import TripSortingView from '../view/sorting.js';
import EventsListView from '../view/events-list.js';
import NoPointView from '../view/no-point.js';
import LoadingView from '../view/loading.js';
import {render, RenderPosition,  remove} from '../utils/render.js';
import PointPresenter from './point.js';
import PointNewPresenter from './point-new.js';
import {sortTime, sortPrice, sortDefault} from '../utils/point.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';

export default class Trip {
  constructor(siteHeaderElement, siteMainElement, pointsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._mainContainer = siteHeaderElement.querySelector('.trip-main');
    this._pointsContainer = siteMainElement.querySelector('.trip-events');

    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._pointPresenter = new Map();

    this._listComponent = null;
    this._sortComponent = null;
    this._noPointComponent = null;

    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._listComponent);
    remove(this._sortComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filtredPoints.sort(sortDefault);
      case SortType.TIME:
        return filtredPoints.sort(sortTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortPrice);
    }

    return filtredPoints;
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда нажали Favorite)
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда изменилось описание точки - тип/город тп) (нет сброса сортировки)
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // - перерисовать весь список, когда меняются фильтры (сброс сортировки)
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderInfo() {
    this._infoComponent = new TripInfoView(this._getPoints());
    render(this._mainContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCost() {
    this._costComponent = new TripCostView(this._getPoints());
    render(this._infoComponent, this._costComponent);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new TripSortingView(this._currentSortType);
    render(this._pointsContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderList() {
    if (this._listComponent !== null) {
      this._listComponent = null;
    }

    this._listComponent = new EventsListView();
    render(this._pointsContainer, this._listComponent);
    this._pointNewPresenter = new PointNewPresenter(this._listComponent, this._handleViewAction);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._infoComponent);
    remove(this._costComponent);
    remove(this._sortComponent);
    remove(this._loadingComponent);

    if (this._noPointComponent) {
      remove(this._noPointComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderLoading() {
    render(this._pointsContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    this._noPointComponent = new NoPointView(this._filterType);
    render(this._pointsContainer, this._noPointComponent);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    if (points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderInfo();
    this._renderCost();

    this._renderSort();
    this._renderList();
    this._renderPoints(points);
  }
}
