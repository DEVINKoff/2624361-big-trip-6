import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate, humanizeTime, humanizeDuration} from '../utils/event.js';

function createOfferTemplate(offer) {
  return `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `;
}

function createEventTemplate(event, destination, offers) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    isFavorite,
    type
  } = event;

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizeDate(dateFrom)}">${humanizeDate(dateFrom)}</time>

        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${type}.png"
            alt="Event type icon"
          >
        </div>

        <h3 class="event__title">${type} ${destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time datetime="${dateFrom}">
              ${humanizeTime(dateFrom)}
            </time>
            —
            <time datetime="${dateTo}">
              ${humanizeTime(dateTo)}
            </time>
          </p>

          <p class="event__duration">${humanizeDuration(dateFrom, dateTo)}</p>
        </div>

        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>

        <ul class="event__selected-offers">
          ${offers.map(createOfferTemplate).join('')}
        </ul>

        <button
          class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}"
          type="button"
        >
          <span class="visually-hidden">Add to favorite</span>
          <svg
            class="event__favorite-icon"
            width="28"
            height="28"
            viewBox="0 0 28 28"
          >
            <path
              d="M14 21l-8.816 4.636 1.684-9.818L0 9.182l9.592-1.364L14 0l4.408
              7.818L28 9.182l-6.868 6.636
              1.684 9.818z"
            />
          </svg>
        </button>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
          <svg
            class="event__rollup-btn-icon"
            width="17"
            height="10"
            viewBox="0 0 17 10"
          >
            <path d="M0 0l8.5 8.5L17 0"/>
          </svg>
        </button>
      </div>
    </li>
  `;
}

export default class EventView extends AbstractView {
  #event = null;
  #destination = null;
  #offers = [];

  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({event, destination, offers, onEditClick, onFavoriteClick}) {
    super();

    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;

    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventTemplate(
      this.#event,
      this.#destination,
      this.#offers
    );
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
