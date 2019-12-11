import RouteComponent from "./components/route";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import TripController from "./controllers/trip";
import {generateTripDays, getTripCost} from "./mock/trip-card";
import {generateSiteMenu} from "./mock/site-menu";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";

const filters = generateFilters();
const siteMenu = generateSiteMenu();
export const tripDays = generateTripDays();

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, new RouteComponent(tripDays), RenderPosition.AFTERBEGIN);

const tripCostElement = tripInfoElement.querySelector(`.trip-info__cost-value`);
tripCostElement.innerHTML = getTripCost(tripDays);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const menuTitleElement = tripControlsElement.querySelector(`h2`);
render(menuTitleElement, new SiteMenuComponent(siteMenu), RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
const boardController = new TripController(tripEventsElement);

boardController.render(tripDays);


