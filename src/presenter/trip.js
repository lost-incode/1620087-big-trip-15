import SiteMenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripFiltersView from './view/filters.js';
import {render, RenderPosition} from './utils/render.js';

export default class Trip {
  constructor(tripContainer, filterContainer, mainContainer) {
    this._tripContainer = tripContainer;
    this._filterContainer = filterContainer;
    this._mainContainer = mainContainer;

    this._menuComponent = new SiteMenuView();
    // this._infoComponent = new TripInfoView();
    // this._costComponent = new TripCostView();
    this._filterComponent = new TripFiltersView();
  }

  init(points) {
    this._points = points.slice();
    this._infoComponent = new TripInfoView(points);
    this._costComponent = new TripCostView(points);
    // render(this._boardComponent, this._taskListComponent, RenderPosition.BEFOREEND);

    this._renderTrip(points);
  }

  _renderMenu(container) {
    render(container, this._menuComponent);
  }

  _renderFilter(container) {
    render(container, this._filterComponent);
  }

  _renderInfo() {
    render(this._mainContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCost() {
    render(this._infoComponent, this._costComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    this._renderMenu(this._tripContainer);
    this._renderFilter(this._filterContainer);
    if (this._points.length === 0) {
      return;
    }

    this._renderInfo();
    this._renderCost();
  }
}
