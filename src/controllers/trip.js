import TripCardComponent from "../components/trip-card";
import FormEditComponent from "../components/form-edit";
import SortComponent from "../components/sort";
import TripDaysComponent from "../components/trip-days";
import NoPointsComponent from "../components/no-points";
import {render, RenderPosition, replace} from "../utils/render";

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

  render(tripEventsListElement[i], cardComponent, RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._noPointsComponent = new NoPointsComponent();
  }

  render(tripDays) {
    const isTripPoints = tripDays.flat().length > 0;
    const tripDaysComponent = new TripDaysComponent(tripDays);

    if (!isTripPoints) {
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, tripDaysComponent, RenderPosition.BEFOREEND);

      const tripDaysListElement = this._container.querySelector(`.trip-days`);
      const tripEventsListElement = tripDaysListElement.querySelectorAll(`.trip-events__list`);

      tripDays.forEach(((tripDay, i) => tripDay.forEach((tripCard) => {
        renderCard(tripEventsListElement, tripCard, i);
      })));
    }
  }
}

