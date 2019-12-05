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

const editForm = generateFormEdit();
const filters = generateFilters();
const siteMenu = generateSiteMenu();

const tripDays = generateTripDays();


const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
const tripCostElement = tripInfoElement.querySelector(`.trip-info__cost-value`);
tripCostElement.innerHTML = getTripCost(tripDays);
render(tripInfoElement, createRouteTemplate(tripDays), `afterbegin`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsElement, createFilterTemplate(filters), `beforeend`);

const menuTitleElement = tripControlsElement.querySelector(`h2`);
render(menuTitleElement, createSiteMenuTemplate(siteMenu), `beforebegin`);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createFormEditTemplate(editForm), `beforeend`);
render(tripEventsElement, createTripDaysTemplate(tripDays), `beforeend`);


