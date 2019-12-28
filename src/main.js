import RouteComponent from "./components/route";
import SiteMenuComponent from "./components/site-menu";
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
});

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();

const menuTitleElement = tripControlsElement.querySelector(`h2`);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  boardController.createPoint();
});

render(menuTitleElement, new SiteMenuComponent(siteMenu), RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
const boardController = new TripController(tripEventsElement, pointsModel);

boardController.render();


