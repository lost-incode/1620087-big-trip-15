import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import SiteMenuView from './view/menu.js';
import StatsView from './view/stats.js';
import {MenuItem, UpdateType} from './const.js';
import {render, remove} from './utils/render.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic el7y2374523779t';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const pageBodyContainer = siteMainElement.querySelector('.page-body__container');
const filterContainer = document.querySelector('.trip-controls__filters');
const menuContainer = siteHeaderElement.querySelector('.trip-controls__navigation');

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

// Rendering components to the page
const siteMenuComponent = new SiteMenuView();
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);
const tripPresenter = new TripPresenter(siteHeaderElement, siteMainElement, pointsModel, filterModel, api);

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

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    render(menuContainer, siteMenuComponent);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(menuContainer, siteMenuComponent);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
