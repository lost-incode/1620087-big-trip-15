import EditingFormView from '../view/edit-form.js';
import TripPointView from '../view/trip-point.js';
import {render, replace, remove} from '../utils/render.js';

export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new TripPointView(point);
    this._pointEditComponent = new EditingFormView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setPointClickHandler(this._handleFormClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointListContainer, this._pointComponent);
      return;
    }

    if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointListContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }

  _handleFormClick() {
    this._replaceFormToPoint();
  }

  // _renderPoint() {
  //   pointComponent.setEditClickHandler(() => {
  //     replacePointToForm();
  //     document.addEventListener('keydown', onEscKeyDown);
  //   });

  //   pointEditComponent.setPointClickHandler(() => {
  //     replaceFormToPoint();
  //     document.removeEventListener('keydown', onEscKeyDown);
  //   });

  //   pointEditComponent.setFormSubmitHandler(() => {
  //     replaceFormToPoint();
  //     document.removeEventListener('keydown', onEscKeyDown);
  //   });

  //   render(container, pointComponent);
  // }
}
