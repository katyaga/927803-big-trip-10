import {capitalize, formatTime, getDurationDateTime} from "../utils/common";
import AbstractComponent from "./abstarct-component";
import {TRANSFER_NAMES} from "../const";

export default class TripCard extends AbstractComponent {
  constructor(tripCard) {
    super();

    this._tripCard = tripCard;
    this._options = tripCard.options;
    this._destination = tripCard.destination;
    this._dateStart = tripCard.dateStart;
    this._dateEnd = tripCard.dateEnd;
  }

  _createOptionsList() {
    const checkedOptions = this._options.filter((checkedOption) => checkedOption.checked === true);
    const visibleOptions = (checkedOptions.length > 3) ? checkedOptions.slice(0, 3) : checkedOptions;
    return visibleOptions.map((option) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${option.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
         </li>`
      );
    }).join(`\n`);
  }

  _getEventDuration() {
    return getDurationDateTime(this._dateStart, this._dateEnd);
  }

  _createTripCardTemplate() {
    const {type, price} = this._tripCard;

    return (
      `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalize(type)} ${TRANSFER_NAMES.includes(type) ? `to` : `in`} ${this._destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${this._dateStart}">${formatTime(this._dateStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="${this._dateEnd}">${formatTime(this._dateEnd)}</time>
          </p>
          <p class="event__duration">${this._getEventDuration()}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._createOptionsList()}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
    );
  }

  getTemplate() {
    return this._createTripCardTemplate();
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}


