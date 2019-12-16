import {formatTime, castTimeFormat} from "../utils/common";
import AbstractComponent from "./abstarct-component";

export default class TripCard extends AbstractComponent {
  constructor(tripCard) {
    super();

    this._tripCard = tripCard;
    this._options = tripCard.options;
    this._dateStart = tripCard.dateStart;
    this._dateEnd = tripCard.dateEnd;
    this._duration = tripCard.duration;
  }

  _createOptionsList() {
    let visibleOptions = (this._options.length > 3) ? this._options.slice(0, 3) : this._options;
    return visibleOptions.map((option) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${option.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
         </li>`
      );
    }).join(`\n`);
  }

  _getEventDuration() {
    let durationMinutes = (this._duration) / 60000;
    if (durationMinutes < 60) {
      return `${castTimeFormat(durationMinutes)}M`;
    }
    if (durationMinutes < 24 * 60) {
      let hours = (Math.floor(durationMinutes / 60));
      let minutes = durationMinutes % 60;
      return `${castTimeFormat(hours)}H ${castTimeFormat(minutes)}M`;
    }

    let days = (Math.floor(durationMinutes / (24 * 60)));
    durationMinutes = durationMinutes - days * 24 * 60;
    let hours = Math.floor(durationMinutes / 60);
    let minutes = durationMinutes % 60;
    return `${castTimeFormat(days)}D ${castTimeFormat(hours)}H ${castTimeFormat(minutes)}M`;
  }

  _createTripCardTemplate() {
    const {type, city, price} = this._tripCard;

    return (
      `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.title} ${city}</h3>

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
          ${type.group === `transfer` ? this._createOptionsList() : ``}
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


