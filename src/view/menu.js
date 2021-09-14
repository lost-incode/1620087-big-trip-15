import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';

const ACTIVE_BUTTON_CLASS = 'trip-tabs__btn--active';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="${MenuItem.TABLE}">Table</a>
  <a class="trip-tabs__btn" href="#" id="${MenuItem.STATS}">Stats</a>
  </nav>`
);

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._tableMenuButton = this.getElement().querySelector(`#${MenuItem.TABLE}`);
    this._statsMenuButton = this.getElement().querySelector(`#${MenuItem.STATS}`);

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem() {
    this._tableMenuButton.classList.toggle(ACTIVE_BUTTON_CLASS);
    this._statsMenuButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }
}
