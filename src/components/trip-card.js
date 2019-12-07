import {formatTime, castTimeFormat, createElement} from "../utils";

export const createTripCardTemplate = (tripCard) => {

  const {type, city, price, options, dateStart, dateEnd} = tripCard;

  const createOptionsList = () => {
    let visibleOptions = (options.length > 3) ? options.slice(0, 3) : options;
    return visibleOptions.map((option) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${option.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
         </li>`
      );
    }).join(`\n`);
  };

  const getEventDuration = () => {
    let durationMinutes = (dateEnd - dateStart) / 60000;
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
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.title} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}">${formatTime(dateStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEnd}">${formatTime(dateEnd)}</time>
          </p>
          <p class="event__duration">${getEventDuration()}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOptionsList()}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripCard {
  constructor(tripCard) {
    this._tripCard = tripCard;
    this._element = null;
  }

  getTemplate() {
    return createTripCardTemplate(this._tripCard);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


