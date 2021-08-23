import SiteMenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripFiltersView from './view/filters.js';
import {render, RenderPosition} from './utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._menuComponent = new SiteMenuView();
    this._infoComponent = new TripInfoView();
    this._costComponent = new TripCostView();
    this._filterComponent = new TripFiltersView();
  }

  init(points) {
    this._points = points.slice();
    // render(this._boardComponent, this._taskListComponent, RenderPosition.BEFOREEND);

    this._renderTrip(points);
  }

  _renderMenu(container) {
    // Метод для рендеринга сортировки
    render();
  }

  _renderFilter() {
    // Метод для рендеринга сортировки
    render();
  }

  _renderInfo(points) {
    // Метод для рендеринга сортировки
    render();
  }

  _renderCost(points) {
    render();
  }

  _renderTrip(points) {
    this._renderMenu(this._tripContainer);
    this._renderFilter();
    if (points.length === 0) {
      return;
    }

    this._renderInfo(points);
    this._renderCost(points);
  }
}
