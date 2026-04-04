import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import {render, replace} from '../framework/render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #eventListComponent = new EventListView();

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    const events = this.#eventsModel.events;

    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    for (let i = 0; i < events.length; i++) {
      this.#renderEvent(events[i]);
    }
  }

  #renderEvent(event) {
    const destination = this.#eventsModel.getDestinationById(event.destination);
    const offersByType = this.#eventsModel.getOffersByType(event.type);
    const selectedOffers = offersByType.filter((offer) => event.offers.includes(offer.id));
    const allDestinations = this.#eventsModel.destinations;

    const eventComponent = new EventView({
      event,
      destination,
      offers: selectedOffers,
      onEditClick: () => {
        replaceEventToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const editEventComponent = new EditEventView({
      event,
      destination,
      allOffers: offersByType,
      allDestinations,
      onFormSubmit: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseClick: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replaceEventToForm() {
      replace(editEventComponent, eventComponent);
    }

    function replaceFormToEvent() {
      replace(eventComponent, editEventComponent);
    }

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    render(eventComponent, this.#eventListComponent.element);
  }
}