import SiteMenuView from '../view/menu.js';
import {render} from '../utils/render.js';

export default class Menu {
  constructor(menuContainer) {
    this._menuContainer = menuContainer;

    this._menuComponent = new SiteMenuView();
  }

  init() {
    render(this._menuContainer, this._menuComponent);
  }
}
