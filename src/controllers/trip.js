import SortComponent, {SortType} from "../components/sort";
import TripDaysComponent from "../components/trip-days";
import NoPointsComponent from "../components/no-points";
import {render, RenderPosition} from "../utils/render";
import {generateTripCards, generateTripDays} from "../mock/trip-card";
import TripDayComponent from "../components/tripDay";
import PointController from "./point";

export const tripCards = generateTripCards();
export const tripDaysCards = generateTripDays(tripCards);

export default class TripController {
  constructor(container) {
    this._container = container;

    this._tripCards = [];
    this._sortComponent = new SortComponent();
    this._noPointsComponent = new NoPointsComponent();
    this._tripDaysComponent = new TripDaysComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(tripDays) {
    this._tripDays = tripDays;
    const isTripPoints = this._tripDays.flat().length > 0;

    if (!isTripPoints) {
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);
      const showedCards = this.renderEventsWithDays(this._tripDays, this._onDataChange, this._onViewChange);
      this._tripCards = this._tripCards.concat(showedCards);

      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        this._tripDaysComponent.clearElement();
        let sortedCards = [];
        let renderedCard;

        switch (sortType) {

          case SortType.TIME:
            sortedCards = tripCards.slice().sort((a, b) => b.duration - a.duration);
            renderedCard = this.renderEventsWithoutDays(sortedCards, this._onDataChange, this._onViewChange);
            this._tripCards = this._tripCards.concat(renderedCard);
            break;
          case SortType.PRICE:
            sortedCards = tripCards.slice().sort((a, b) => b.price - a.price);
            renderedCard = this.renderEventsWithoutDays(sortedCards, this._onDataChange, this._onViewChange);
            this._tripCards = this._tripCards.concat(renderedCard);
            break;
          case SortType.DEFAULT:
            renderedCard = this.renderEventsWithDays(this._tripDays, this._onDataChange, this._onViewChange);
            this._tripCards = this._tripCards.concat(renderedCard);
            break;
        }
      });
    }
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tripDays.flat().findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tripDaysCards = [].concat(this._tripDays.flat().slice(0, index), newData, this._tripDays.flat().slice(index + 1));

    taskController.render(this._tripDaysCards[index]);
  }

  _onViewChange() {
    this._tripCards.forEach((it) => it.setDefaultView());
  }

  renderEventsWithDays(tripDaysArray, onDataChange, onViewChange) {
    const eventPoints = [];
    tripDaysArray.forEach((tripDay, i) => {
      let tripDayComponent = new TripDayComponent(tripDay, i);
      render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
      const tripEventsListElement = document.querySelectorAll(`.trip-events__list`);

      tripDay.forEach((tripCard) => {
        const pointController = new PointController(tripEventsListElement[i], onDataChange, onViewChange);
        pointController.render(tripCard);
        eventPoints.push(pointController);
      });
    });
    return eventPoints;
  }

  renderEventsWithoutDays(tripCardsArray, onDataChange, onViewChange) {
    const a = [];
    tripCardsArray.forEach((tripCard) => {
      let tripDayComponent = new TripDayComponent();
      render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
      const tripEventsListElement = document.querySelector(`.trip-events__list`);

      const pointController = new PointController(tripEventsListElement, onDataChange, onViewChange);
      pointController.render(tripCard);
      a.push(pointController);
    });
    return a;
  }
}


