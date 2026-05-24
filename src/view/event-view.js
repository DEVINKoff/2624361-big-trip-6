import {createElement} from '../render.js';
function createEventTemplate(event, destination, selectedOffers) {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = event;

  const favoriteClass = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatDateAttribute(dateFrom)}">${formatDate(dateFrom)}</time>

        <div class="event__type">
          <img
            class="event__type-icon"
            width="42"
            height="42"
            src="img/icons/${type}.png"
            alt="Event type icon"
          >
        </div>

        <h3 class="event__title">${type[0].toUpperCase() + type.slice(1)} ${destination ? destination.name : ''}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${formatTime(dateFrom)}</time>
            —
            <time class="event__end-time" datetime="${dateTo}">${formatTime(dateTo)}</time>
          </p>

          <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
        </div>

        <p class="event__price">
          € <span class="event__price-value">${basePrice}</span>
        </p>

        ${createOffersTemplate(selectedOffers)}

        <button class="event__favorite-btn ${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>

          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventView {
  #element = null;
  #event = null;
  #destination = null;
  #offers = null;

  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({event, destination, offers, onEditClick, onFavoriteClick}) {
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;

    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
  }

  get template() {
    return createEventTemplate(this.#event, this.#destination, this.#offers);
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.template);

      this.#element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#editClickHandler);

      this.#element
        .querySelector('.event__favorite-btn')
        .addEventListener('click', this.#favoriteClickHandler);
    }

    return this.#element;
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  removeElement() {
    this.#element = null;
  }
}