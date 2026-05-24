import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import {render} from '../framework/render.js';
import EventPresenter from './event-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;

  #eventListComponent = new EventListView();

  #eventPresenters = new Map();

  constructor({boardContainer, eventsModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    const events = this.#eventsModel.events;

    if (!events.length) {
      render(new NoEventView(), this.#boardContainer);
      return;
    }

    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    events.forEach((event) => this.#renderEvent(event));
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      container: this.#eventListComponent.element,
      eventsModel: this.#eventsModel,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #handleEventChange = (updatedEvent) => {
    this.#eventsModel.updateEvent(updatedEvent);

    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
