import RouteComponent from "./components/route";
import SiteMenuComponent, {MenuItem} from "./components/site-menu";
import StatisticsComponent from './components/statistics.js';
import FilterController from './controllers/filter.js';
import TripController from "./controllers/trip";
import PointsModel from "./models/points";
import {generateSiteMenu} from "./mock/site-menu";
import {remove, render, RenderPosition, renderTravelCost} from "./utils/render";
import {tripCards} from "./controllers/trip";

const siteMenu = generateSiteMenu();

const pointsModel = new PointsModel();
pointsModel.setTripPoints(tripCards);

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
let routeComponent = new RouteComponent(tripCards);
render(tripInfoElement, routeComponent, RenderPosition.AFTERBEGIN);

renderTravelCost(tripCards);

pointsModel.setDataChangeHandler(() => {
  const points = pointsModel.getFilteredDays();

  renderTravelCost(points);
  remove(routeComponent);
  routeComponent = new RouteComponent(points);
  render(tripInfoElement, routeComponent, RenderPosition.AFTERBEGIN);
  statisticsComponent = new StatisticsComponent(points.flat());
  render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);
});

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();

const menuTitleElement = tripControlsElement.querySelector(`h2`);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  boardController.createPoint();
});

let statisticsComponent = new StatisticsComponent(pointsModel.getPointsAll());
const siteMenuComponent = new SiteMenuComponent(siteMenu);

render(menuTitleElement, siteMenuComponent, RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
const boardController = new TripController(tripEventsElement, pointsModel);
render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);

statisticsComponent.hide();
boardController.render();

siteMenuComponent.setClickHandler((evt) => {
  siteMenuComponent.setActiveItem(evt.target);
  if (evt.target.dataset.tab === MenuItem.STATISTICS) {
    boardController.hide();
    statisticsComponent.show();
  } else {
    statisticsComponent.hide();
    boardController.show();
  }
});

