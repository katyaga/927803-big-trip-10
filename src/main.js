import RouteComponent from "./components/route";
import SiteMenuComponent from "./components/site-menu";
import FilterComponent from "./components/filter";
import SortComponent from "./components/sort";
import FormEditComponent from "./components/form-edit";
import TripDaysComponent from "./components/trip-days";
import TripCardComponent from "./components/trip-card";
import NoPoints from "./components/no-points";
import {generateTripDays, getTripCost} from "./mock/trip-card";
import {generateSiteMenu} from "./mock/site-menu";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils";

const filters = generateFilters();
const siteMenu = generateSiteMenu();
export const tripDays = generateTripDays();

const renderCard = (tripEventsListElement, card, i) => {
  const cardComponent = new TripCardComponent(card);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const replaceEditToCard = () => {
    editCardComponent.getElement().parentElement.replaceChild(cardComponent.getElement(), editCardComponent.getElement());
  };

  const replaceCardToEdit = () => {
    cardComponent.getElement().parentElement.replaceChild(editCardComponent.getElement(), cardComponent.getElement());
  };

  const editCardComponent = new FormEditComponent(card);

  const editButton = cardComponent.getElement().querySelector(`.event__rollup-btn`);

  editButton.addEventListener(`click`, () => {
    replaceCardToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editForm = editCardComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, replaceEditToCard);

  render(tripEventsListElement[i], cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const tripInfoElement = document.querySelector(`.trip-main__trip-info`);
const tripCostElement = tripInfoElement.querySelector(`.trip-info__cost-value`);
tripCostElement.innerHTML = getTripCost(tripDays);

const tripControlsElement = document.querySelector(`.trip-main__trip-controls`);
const menuTitleElement = tripControlsElement.querySelector(`h2`);
render(menuTitleElement, new SiteMenuComponent(siteMenu).getElement(), RenderPosition.AFTEREND);
render(tripControlsElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const isTripPoints = tripDays.flat().length > 0;
const tripEventsElement = document.querySelector(`.trip-events`);


if (!isTripPoints) {
  render(tripEventsElement, new NoPoints().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripInfoElement, new RouteComponent(tripDays).getElement(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new TripDaysComponent(tripDays).getElement(), RenderPosition.BEFOREEND);

  const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);
  const tripEventsListElement = tripDaysListElement.querySelectorAll(`.trip-events__list`);

  tripDays.forEach(((tripDay, i) => tripDay.forEach((tripCard) => {
    renderCard(tripEventsListElement, tripCard, i);
  })));
}


