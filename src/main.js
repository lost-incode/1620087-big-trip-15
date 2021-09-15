import {generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import SiteMenuView from './view/menu.js';
import StatsView from './view/stats.js';
import {MenuItem} from './const.js';
import {render, remove} from './utils/render.js';
import Api from './api.js';

const POINT_COUNT = 22;
const AUTHORIZATION = 'Basic el7y237hy23779t';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const points = new Array(POINT_COUNT).fill().map(generatePoint);
const api = new Api(END_POINT, AUTHORIZATION);

api.getPoints().then((points) => {
  console.log(points);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const pageBodyContainer = siteMainElement.querySelector('.page-body__container');
const filterContainer = document.querySelector('.trip-controls__filters');
const menuContainer = siteHeaderElement.querySelector('.trip-controls__navigation');

const siteMenuComponent = new SiteMenuView();

render(menuContainer, siteMenuComponent);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

// Rendering components to the page
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);
const tripPresenter = new TripPresenter(siteHeaderElement, siteMainElement, pointsModel, filterModel);


let statsComponent = null;
//добавление статистики

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.setMenuItem();
      tripPresenter.init();
      remove(statsComponent);
      break;
    case MenuItem.STATS:
      siteMenuComponent.setMenuItem();
      tripPresenter.destroy();
      statsComponent = new StatsView(pointsModel.getPoints());
      render(pageBodyContainer, statsComponent);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();

tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
