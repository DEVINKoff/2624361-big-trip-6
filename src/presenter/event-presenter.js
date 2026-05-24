import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import {render, replace} from '../render.js';

export default class EventPresenter {
  #eventListContainer = null;
  #event = null;
  #destination = null;
  #offers = null;
  #allDestinations = null;
  #allOffers = null;

  #eventComponent = null;
  #editEventComponent = null;

  #onDataChange = null;
  #onModeChange = null;

  constructor({
    eventListContainer,
    event,
    destination,
    offers,
    allOffers,
    allDestinations,
    onDataChange,
    onModeChange,
  }) {
    this.#eventListContainer = eventListContainer;
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;

    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init() {
    this.#eventComponent = new EventView({
      event: this.#event,
      destination: this.#destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editEventComponent = new EditEventView({
      event: this.#event,
      destination: this.#destination,
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
      onRollupClick: this.#handleRollupClick,
    });

    render(this.#eventComponent, this.#eventListContainer);
  }

  resetView() {
    if (this.#editEventComponent && this.#eventComponent) {
      replace(this.#eventComponent, this.#editEventComponent);
    }
  }

  #replaceEventToForm() {
    this.#onModeChange();
    replace(this.#editEventComponent, this.#eventComponent);
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#editEventComponent);
  }

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleRollupClick = () => {
    this.#replaceFormToEvent();
  };

  #handleFavoriteClick = () => {
    this.#onDataChange({
      ...this.#event,
      isFavorite: !this.#event.isFavorite,
    });
  };
}