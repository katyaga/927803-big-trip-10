import {createRouteTemplate} from "./components/route";
import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createSortTemplate} from "./components/sort";
import {createFormEditTemplate} from "./components/form-edit";
import {createTripDaysTemplate} from "./components/trip-days";
import {createTripCardTemplate} from "./components/trip-card";
import {generateFormEdit} from "./mock/form-edit";
import {generateTripCards} from "./mock/form-edit";
import {generateSiteMenu} from "./mock/site-menu";
import {generateFilters} from "./mock/filter";

const CARDS_COUNT = 5;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const editForm = generateFormEdit();
const filters = generateFilters();
const siteMenu = generateSiteMenu();
const tripCards = generateTripCards(CARDS_COUNT);

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createRouteTemplate(tripCards), `afterbegin`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsElement, createFilterTemplate(filters), `beforeend`);

const menuTitleElement = tripControlsElement.querySelector(`h2`);
render(menuTitleElement, createSiteMenuTemplate(siteMenu), `beforebegin`);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createFormEditTemplate(editForm), `beforeend`);
render(tripEventsElement, createTripDaysTemplate(), `beforeend`);

const tripListElement = tripEventsElement.querySelector(`.trip-events__list`);
tripCards.forEach((tripCard) => render(tripListElement, createTripCardTemplate(tripCard), `beforeend`));
