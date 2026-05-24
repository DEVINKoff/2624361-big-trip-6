import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilter) {
  const {type, count} = filter;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilter ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type[0].toUpperCase() + type.slice(1)}</label>
    </div>`
  );
}

function createFilterTemplate(filters, currentFilter) {
  const filtersMarkup = filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor({filters, currentFilter}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }
}
