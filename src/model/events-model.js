import {generateEvents} from '../mock/event.js';
import {generateDestinations} from '../mock/destination.js';
import {generateOffers} from '../mock/offer.js';

export default class EventsModel {
  #events = generateEvents();
  #destinations = generateDestinations();
  #offers = generateOffers();

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id) || null;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type)?.offers || [];
  }

  updateEvent(updatedEvent) {
    this.#events = this.#events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
  }
}
