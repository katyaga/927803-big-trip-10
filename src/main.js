import RouteComponent from "./components/route";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import FormEditComponent from "./components/form-edit";
import TripDaysComponent from "./components/trip-days";
import TripCard from "./components/trip-days";
import {generateFormEdit, generateTripDays, getTripCost} from "./mock/form-edit";
import {generateSiteMenu} from "./mock/site-menu";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils";

// const render = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

// const editForm = generateFormEdit();
const filters = generateFilters();
const siteMenu = generateSiteMenu();
const tripDays = generateTripDays();

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
const tripCostElement = tripInfoElement.querySelector(`.trip-info__cost-value`);
tripCostElement.innerHTML = getTripCost(tripDays);

render(tripInfoElement, new RouteComponent(tripDays).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const menuTitleElement = tripControlsElement.querySelector(`h2`);
render(menuTitleElement, new SiteMenuComponent(siteMenu).getElement(), RenderPosition.AFTEREND);
render(tripControlsElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new FormEditComponent(editForm).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripDaysComponent(tripDays).getElement(), RenderPosition.BEFOREEND);


