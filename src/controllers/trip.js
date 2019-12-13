import TripCardComponent from "../components/trip-card";
import FormEditComponent from "../components/form-edit";
import SortComponent, {SortType} from "../components/sort";
import TripDaysComponent from "../components/trip-days";
import NoPointsComponent from "../components/no-points";
import {render, RenderPosition, replace} from "../utils/render";
import {generateTripCards, generateTripDays} from "../mock/trip-card";
import TripDayComponent from "../components/tripDay";

export const tripCards = generateTripCards();
export const tripDaysCards = generateTripDays(tripCards);

const renderCard = (tripEventsList, card) => {
  const cardComponent = new TripCardComponent(card);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const replaceEditToCard = () => {
    replace(cardComponent, editCardComponent);
  };

  const replaceCardToEdit = () => {
    replace(editCardComponent, cardComponent);
  };

  const editCardComponent = new FormEditComponent(card);

  cardComponent.setEditButtonClickHandler(() => {
    replaceCardToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  editCardComponent.setSubmitHandler(replaceEditToCard);
  render(tripEventsList, cardComponent, RenderPosition.BEFOREEND);
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._tripDaysComponent = new TripDaysComponent();
  }

  render(tripDays) {
    const isTripPoints = tripDays.flat().length > 0;

    if (!isTripPoints) {
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
      this.renderEventsWithDays(tripDays);

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        this._tripDaysComponent.clearElement();
        let sortedCards = [];

        switch (sortType) {
          case SortType.TIME:
            sortedCards = tripCards.slice().sort((a, b) => b.duration - a.duration);
            this.renderEventsWithoutDays(sortedCards);
            break;
          case SortType.PRICE:
            sortedCards = tripCards.slice().sort((a, b) => b.price - a.price);
            this.renderEventsWithoutDays(sortedCards);
            break;
          case SortType.DEFAULT:
            this.renderEventsWithDays(tripDays);
            break;
        }
      });
    }
  }

  renderEventsWithDays(tripDaysArray) {
    tripDaysArray.forEach((tripDay, i) => {
      let tripDayComponent = new TripDayComponent(tripDay, i);
      render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
      const tripEventsListElement = document.querySelectorAll(`.trip-events__list`);

      tripDay.forEach((tripCard) => {
        renderCard(tripEventsListElement[i], tripCard);
      });
    });
  }

  renderEventsWithoutDays(tripCardsArray) {
    tripCardsArray.forEach((tripCard) => {
      let tripDayComponent = new TripDayComponent();
      render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
      const tripEventsListElement = document.querySelector(`.trip-events__list`);
      renderCard(tripEventsListElement, tripCard);
    });
  }
}


