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

    this._listComponent = new EventsListView();
    this._pointComponent = new TripPointView();
    this._sortComponent = new TripSortingView();
    this._noPointComponent = new NoPointView();
  }

  init(points) {
    this._points = points.slice();
    // render(this._boardComponent, this._taskListComponent, RenderPosition.BEFOREEND);

    this._renderPoint();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderList(constainer) {
    render();
  }

  _renderPoint(pointListElement, point) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js

    const pointComponent = new TripPointView(point);
    const pointEditComponent = new EditingFormView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setPointClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointListElement, pointComponent);
  }

  _renderNoPoints() {
    // Метод для рендеринга заглушки
  }

  _renderPoints(points) {
    if (points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderList(this._pointsContainer);

    for (const point of points) {
      this._renderPoint(this._listComponent, point);
    }
  }
}
