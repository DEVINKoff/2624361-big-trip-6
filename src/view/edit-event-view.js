import {createElement} from '../render.js';

function createEventTypeItemsTemplate(currentType) {
  const eventTypes = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant'
  ];

  return eventTypes.map((type) => (
    `<div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${type === currentType ? 'checked' : ''}
      >
      <label
        class="event__type-label event__type-label--${type}"
        for="event-type-${type}-1"
      >
        ${type}
      </label>
    </div>`
  )).join('');
}

function createOffersTemplate(offers, selectedOffers) {
  if (!offers.length) {
    return '';
  }

  const offersMarkup = offers.map((offer) => {
    const isChecked = selectedOffers.includes(offer.id);

    return (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${offer.id}"
          type="checkbox"
          name="event-offer-${offer.id}"
          ${isChecked ? 'checked' : ''}
        >

        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  }).join('');

  return (
    `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">
        Offers
      </h3>

      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>`
  );
}

function createDestinationTemplate(destination) {
  if (!destination) {
    return '';
  }

  return (
    `<section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">
        Destination
      </h3>

      <p class="event__destination-description">
        ${destination.description}
      </p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map((picture) => (
    `<img
      class="event__photo"
      src="${picture.src}"
      alt="${picture.description}"
    >`
  )).join('')}
        </div>
      </div>
    </section>`
  );
}

function createEditEventTemplate(event, destination, offers, destinations) {
  const {
    basePrice,
    dateFrom,
    dateTo,
    type,
    offers: selectedOffers
  } = event;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">

        <header class="event__header">

          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>

              <img
                class="event__type-icon"
                width="17"
                height="17"
                src="img/icons/${type}.png"
                alt="Event type icon"
              >
            </label>

            <input
              class="event__type-toggle visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
            >

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">
                  Event type
                </legend>

                ${createEventTypeItemsTemplate(type)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label
              class="event__label event__type-output"
              for="event-destination-1"
            >
              ${type}
            </label>

            <input
              class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destination ? destination.name : ''}"
              list="destination-list-1"
            >

            <datalist id="destination-list-1">
              ${destinations.map((item) => (
    `<option value="${item.name}"></option>`
  )).join('')}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label
              class="visually-hidden"
              for="event-start-time-1"
            >
              From
            </label>

            <input
              class="event__input event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${dateFrom}"
            >

            —
            <label
              class="visually-hidden"
              for="event-end-time-1"
            >
              To
            </label>

            <input
              class="event__input event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${dateTo}"
            >
          </div>

          <div class="event__field-group event__field-group--price">
            <label
              class="event__label"
              for="event-price-1"
            >
              <span class="visually-hidden">
                Price
              </span>
              €
            </label>

            <input
              class="event__input event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${basePrice}"
            >
          </div>

          <button
            class="event__save-btn btn btn--blue"
            type="submit"
          >
            Save
          </button>

          <button
            class="event__reset-btn"
            type="reset"
          >
            Cancel
          </button>

          <button
            class="event__rollup-btn"
            type="button"
          >
            <span class="visually-hidden">
              Open event
            </span>
          </button>

        </header>

        <section class="event__details">

          ${createOffersTemplate(offers, selectedOffers)}

          ${createDestinationTemplate(destination)}

        </section>
      </form>
    </li>`
  );
}

export default class EditEventView {
  #element = null;

  #event = null;
  #destination = null;
  #allOffers = null;
  #allDestinations = null;

  #handleRollupClick = null;

  constructor({
    event,
    destination,
    allOffers,
    allDestinations,
    onRollupClick
  }) {
    this.#event = event;
    this.#destination = destination;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this.#handleRollupClick = onRollupClick;
  }

  get template() {
    return createEditEventTemplate(
      this.#event,
      this.#destination,
      this.#allOffers,
      this.#allDestinations
    );
  }

  getElement() {
    if (!this.#element) {
      this.#element = createElement(this.template);

      this.#element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#rollupClickHandler);
    }

    return this.#element;
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  removeElement() {
    this.#element = null;
  }
}