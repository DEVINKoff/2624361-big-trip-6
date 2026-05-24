import AbstractView from '../framework/view/abstract-view.js';
import {NoEventsMessage, FilterType} from '../mock/filter.js';

function createNoEventTemplate(filterType) {
  const message = NoEventsMessage[filterType];

  return `<p class="trip-events__msg">${message}</p>`;
}

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor({filterType = FilterType.EVERYTHING} = {}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(this.#filterType);
  }
}