import API from './api.js';
import RouteComponent from "./components/route";
import SiteMenuComponent, {MenuItem} from "./components/site-menu";
import StatisticsComponent from './components/statistics.js';
import FilterController from './controllers/filter.js';
import TripController from "./controllers/trip";
import PointsModel from "./models/points";
// import {generateSiteMenu} from "./mock/site-menu";
import {remove, render, RenderPosition, renderTravelCost} from "./utils/render";
// import {tripCards} from "./controllers/trip";

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;

// const siteMenu = generateSiteMenu();

const api = new API(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
// pointsModel.setTripPoints(tripCards);

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
let routeComponent;


const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();

const menuTitleElement = tripControlsElement.querySelector(`h2`);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  boardController.createPoint();
});

let statisticsComponent;
const siteMenuComponent = new SiteMenuComponent();

render(menuTitleElement, siteMenuComponent, RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
const boardController = new TripController(tripEventsElement, pointsModel);

// boardController.render();

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

pointsModel.setDataChangeHandler(() => {
  const points = pointsModel.getFilteredDays();

  renderTravelCost(points);
  if (routeComponent) {
    remove(routeComponent);
  }
  routeComponent = new RouteComponent(points);
  render(tripInfoElement, routeComponent, RenderPosition.AFTERBEGIN);

  statisticsComponent = new StatisticsComponent(points.flat());
  render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);
  statisticsComponent.hide();
});

api.getPoints()
  .then((points) => {
    console.log(points);
    pointsModel.setTripPoints(points);
  })
  .then(() => {
    return api.getDestinations()
      .then((destinations) => {
        pointsModel.setDestinations(destinations);
      });
  })
  .then(() => {
    return api.getOffers()
      .then((offers) => {
        pointsModel.setOffers(offers);
      });
  })
  .then(() => {

    if (routeComponent) {
      remove(routeComponent);
    }
    routeComponent = new RouteComponent(pointsModel.getPointsAll());
    render(tripInfoElement, routeComponent, RenderPosition.AFTERBEGIN);
    renderTravelCost(pointsModel.getPointsAll());

    statisticsComponent = new StatisticsComponent(pointsModel.getPointsAll());
    render(tripEventsElement, statisticsComponent, RenderPosition.AFTEREND);
    statisticsComponent.hide();

    boardController.render();
  });

