const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const NoEventsMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

function generateFilters(events) {
  return Object.values(FilterType).map((type) => ({
    type,
    count: filterEvents(events, type).length,
  }));
}

function filterEvents(events, filterType) {
  const now = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return events.filter((event) => new Date(event.dateFrom) > now);
    case FilterType.PRESENT:
      return events.filter((event) => new Date(event.dateFrom) <= now && new Date(event.dateTo) >= now);
    case FilterType.PAST:
      return events.filter((event) => new Date(event.dateTo) < now);
    default:
      return events;
  }
}

export {FilterType, NoEventsMessage, generateFilters};