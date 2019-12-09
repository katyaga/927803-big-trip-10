import RouteComponent from "./components/route";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import FormEditComponent from "./components/form-edit";
import TripDaysComponent from "./components/trip-days";
import TripCardComponent from "./components/trip-card";
import {generateTripDays, getTripCost} from "./mock/trip-card";
import {generateSiteMenu} from "./mock/site-menu";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils";

const filters = generateFilters();
const siteMenu = generateSiteMenu();
export const tripDays = generateTripDays();

const renderCard = (card, i) => {
  const cardComponent = new TripCardComponent(card);
  const editCardComponent = new FormEditComponent(card);

  const editButton = cardComponent.getElement().querySelector(`.event__rollup-btn`);

  editButton.addEventListener(`click`, () => {
    cardComponent.getElement().parentElement.replaceChild(editCardComponent.getElement(), cardComponent.getElement());
  });

  const editForm = editCardComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    editCardComponent.getElement().parentElement.replaceChild(cardComponent.getElement(), editCardComponent.getElement());
  });

  render(tripEventsListElement[i], cardComponent.getElement(), RenderPosition.BEFOREEND);
};

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
render(tripEventsElement, new TripDaysComponent(tripDays).getElement(), RenderPosition.BEFOREEND);

const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);
const tripEventsListElement = tripDaysListElement.querySelectorAll(`.trip-events__list`);

tripDays.forEach(((tripDay, i) => tripDay.forEach((tripCard) => {
  renderCard(tripCard, i);
})));

