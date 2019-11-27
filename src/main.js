import {createRouteTemplate} from "./components/route";
import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createSortTemplate} from "./components/sort";
import {createFormEditTemplate} from "./components/form-edit";
import {createTripDaysTemplate} from "./components/trip-days";
import {createTripCardTemplate} from "./components/trip-card";

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createRouteTemplate(), `afterbegin`);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
render(tripControlsElement, createFilterTemplate(), `beforeend`);

const menuTitleElement = tripControlsElement.querySelector(`h2`);
render(menuTitleElement, createSiteMenuTemplate(), `beforebegin`);

const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate(), `beforeend`);
render(tripEventsElement, createFormEditTemplate(), `beforeend`);
render(tripEventsElement, createTripDaysTemplate(), `beforeend`);

const tripListElement = tripEventsElement.querySelector(`.trip-events__list`);

new Array(TASK_COUNT).fill(``).forEach(
    () => render(tripListElement, createTripCardTemplate(), `beforeend`)
);
