import {createRouteTemplate} from "./components/route";
import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createSortTemplate} from "./components/sort";
import {createFormEditTemplate} from "./components/form-edit";
import {createTripDaysTemplate} from "./components/trip-days";
import {generateFormEdit, generateTripDays, getTripCost} from "./mock/form-edit";
import {generateSiteMenu} from "./mock/site-menu";
import {generateFilters} from "./mock/filter";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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


