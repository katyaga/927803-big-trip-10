import API from './api.js';
import RouteComponent from "./components/route";
import SiteMenuComponent, {MenuItem} from "./components/site-menu";
import StatisticsComponent from './components/statistics.js';
import FilterController from './controllers/filter.js';
import TripController from "./controllers/trip";
import PointsModel from "./models/points";
import {remove, render, renderPosition, renderTravelCost} from "./utils/render";
import {generateAuthorization} from "./utils/common";


const AUTHORIZATION = generateAuthorization();
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;

const api = new API(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();

const init = (points) => {
  const orderedPoints = pointsModel.getFilteredDays();

  if (routeComponent) {
    remove(routeComponent);
  }
  routeComponent = new RouteComponent(orderedPoints);
  render(tripInfoElement, routeComponent, renderPosition.AFTERBEGIN);
  renderTravelCost(pointsModel.getPointsAll());

  statisticsComponent = new StatisticsComponent(points);
  render(tripEventsElement, statisticsComponent, renderPosition.AFTEREND);
  statisticsComponent.hide();
};

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const filterController = new FilterController(tripControlsElement, pointsModel);
filterController.render();

const menuTitleElement = tripControlsElement.querySelector(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);

const siteMenuComponent = new SiteMenuComponent();
render(menuTitleElement, siteMenuComponent, renderPosition.AFTEREND);

let routeComponent;
let statisticsComponent;
let boardController;

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
  const points = pointsModel.getFilteredDays().flat();
  init(points);
});

api.getPoints()
  .then((points) => {
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
    init(pointsModel.getPointsAll());

    boardController = new TripController(tripEventsElement, pointsModel, api);
    boardController.render();

    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
      boardController.createPoint();
    });
  });

