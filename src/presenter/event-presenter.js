import {render, replace} from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';

export default class EventPresenter {
  #container = null;
  #eventsModel = null;
  #event = null;

  #eventComponent = null;
  #editEventComponent = null;

  #onDataChange = null;
  #onModeChange = null;

  constructor({container, eventsModel, onDataChange, onModeChange}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const destination = this.#eventsModel.getDestinationById(event.destination);
    const allOffers = this.#eventsModel.getOffersByType(event.type);
    const selectedOffers = allOffers.filter(
      (offer) => event.offers.includes(offer.id)
    );

    const prevEventComponent = this.#eventComponent;
    const prevEditEventComponent = this.#editEventComponent;

    this.#eventComponent = new EventView({
      event,
      destination,
      offers: selectedOffers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editEventComponent = new EditEventView({
      event,
      destination,
      allOffers,
      allDestinations: this.#eventsModel.destinations,
      onFormSubmit: this.#replaceFormToEvent,
      onCloseClick: this.#replaceFormToEvent
    });

    if (!prevEventComponent || !prevEditEventComponent) {
      render(this.#eventComponent, this.#container);
      return;
    }

    replace(this.#eventComponent, prevEventComponent);
    replace(this.#editEventComponent, prevEditEventComponent);
  }

  resetView() {
    if (
      this.#editEventComponent &&
      this.#container.contains(this.#editEventComponent.element)
    ) {
      this.#replaceFormToEvent();
    }
  }

  #replaceEventToForm = () => {
    replace(this.#editEventComponent, this.#eventComponent);
  };

  #replaceFormToEvent = () => {
    replace(this.#eventComponent, this.#editEventComponent);
  };

  #handleEditClick = () => {
    this.#onModeChange();
    this.#replaceEventToForm();
  };

  #handleFavoriteClick = () => {
    this.#onDataChange({
      ...this.#event,
      isFavorite: !this.#event.isFavorite
    });
  };
}