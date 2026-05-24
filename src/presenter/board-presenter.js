import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventPresenter from './event-presenter.js';
import {render} from '../render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;

  #eventListComponent = new EventListView();

  #eventPresenters = [];

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    const events = this.#eventsModel.events;
    const destinations = this.#eventsModel.destinations;

    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    const firstEvent = events[0];

    const firstDestination =
      this.#eventsModel.getDestinationById(firstEvent.destination);

    const firstOffers =
      this.#eventsModel.getOffersByType(firstEvent.type);

    render(
      new EditEventView({
        event: firstEvent,
        destination: firstDestination,
        allOffers: firstOffers,
        allDestinations: destinations,
      }),
      this.#eventListComponent.getElement()
    );

    for (let i = 1; i < events.length; i++) {
      const event = events[i];

      const destination =
        this.#eventsModel.getDestinationById(event.destination);

      const offersByType =
        this.#eventsModel.getOffersByType(event.type);

      const selectedOffers = offersByType.filter((offer) =>
        event.offers.includes(offer.id)
      );

      const eventPresenter = new EventPresenter({
        eventListContainer: this.#eventListComponent.getElement(),
        event,
        destination,
        offers: selectedOffers,
        allOffers: offersByType,
        allDestinations: destinations,
        onDataChange: this.#handleEventChange,
        onModeChange: this.#handleModeChange,
      });

      eventPresenter.init();

      this.#eventPresenters.push(eventPresenter);
    }
  }

  #handleEventChange = (updatedEvent) => {
    this.#eventsModel.updateEvent(updatedEvent);

    this.#clearBoard();
    this.init();
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) =>
      presenter.resetView()
    );
  };

  #clearBoard() {
    this.#eventPresenters = [];

    this.#eventListComponent.getElement().innerHTML = '';
  }
}