import RouteComponent from "./components/route";
import SiteMenuComponent from "./components/site-menu";
// import FilterComponent from "./components/filter";
import FilterController from './controllers/filter.js';
import TripController from "./controllers/trip";
import PointsModel from "./models/points";
// import {generateTripDays, getTripCost} from "./mock/trip-card";
import {generateSiteMenu} from "./mock/site-menu";
// import {generateFilters} from "./mock/filter";
import {render, RenderPosition, renderTravelCost} from "./utils/render";
import {tripCards} from "./controllers/trip";

// const filters = generateFilters();
const siteMenu = generateSiteMenu();

// const tripDaysCards = generateTripDays(tripCards);

const pointsModel = new PointsModel();
pointsModel.setTripPoints(tripCards);

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, new RouteComponent(tripCards), RenderPosition.AFTERBEGIN);

renderTravelCost(tripCards);

pointsModel.setDataChangeHandler(() => {
  const points = pointsModel.getPointsAll();

  renderTravelCost(points);
});

// const tripCostElement = tripInfoElement.querySelector(`.trip-info__cost-value`);
// tripCostElement.innerHTML = getTripCost(tripCards);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
// render(tripControlsElement, new FilterComponent(filters), RenderPosition.BEFOREEND);
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


