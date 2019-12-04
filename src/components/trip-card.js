import {formatTime} from "../utils";

export const createTripCardTemplate = (tripCard) => {

  const {type, city, price, options, dateStart, dateEnd} = tripCard;

  const createOptionsList = () => {
    return options.map((option) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${option.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
         </li>`
      );
    }).join(`\n`);
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Drive to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}">${formatTime(dateStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEnd}">${formatTime(dateEnd)}</time>
          </p>
          <p class="event__duration"></p>
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



