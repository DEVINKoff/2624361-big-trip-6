import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import {render} from '../render.js';

const EVENTS_COUNT = 3;

export default class BoardPresenter {
  #boardContainer = null;
  #eventListComponent = new EventListView();

  constructor({boardContainer}) {
    this.#boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);
    render(new EditEventView(), this.#eventListComponent.getElement());

    for (let i = 0; i < EVENTS_COUNT; i++) {
      render(new EventView(), this.#eventListComponent.getElement());
    }
  }
}