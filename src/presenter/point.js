import SiteMenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import TripFiltersView from './view/filters.js';
import TripSortingView from './view/sorting.js';
import EventsListView from './view/events-list.js';
import EditingFormView from './view/edit-form.js'; //
import TripPointView from './view/trip-point.js';//
import NoPointView from './view/no-point.js';//
import {render, RenderPosition, replace} from './utils/render.js'; //

export default class Point {
  constructor(pointsContainer) {
    this._pointsContainer = pointsContainer;

    this._pointComponent = new TripPointView();
    this._sortComponent = new TripSortingView();
    this._listComponent = new EventsListView();
    this._noPointComponent = new NoPointView();
  }

  init(points) {
    this._points = points.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderPoint() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderNoTasks() {
    // Метод для рендеринга заглушки
  }

  // _renderBoard() {
  //   // Метод для инициализации (начала работы) модуля,
  //   // бОльшая часть текущей функции renderBoard в main.js
  // }
}
