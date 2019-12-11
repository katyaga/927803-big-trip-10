import RouteComponent from "./components/route";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import TripController from "./controllers/trip";
import {getTripCost} from "./mock/trip-card";
import {generateSiteMenu} from "./mock/site-menu";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";
import {tripCards} from "./controllers/trip";

const filters = generateFilters();
const siteMenu = generateSiteMenu();

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, new RouteComponent(tripCards), RenderPosition.AFTERBEGIN);

const tripCostElement = tripInfoElement.querySelector(`.trip-info__cost-value`);
tripCostElement.innerHTML = getTripCost(tripCards);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const menuTitleElement = tripControlsElement.querySelector(`h2`);
render(menuTitleElement, new SiteMenuComponent(siteMenu), RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
const boardController = new TripController(tripEventsElement);

boardController.render(tripCards);


