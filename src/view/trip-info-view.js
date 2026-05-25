import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const createTripRoute = (points, destinations) => {
  const routeNames = points.map((point) => {
    const destination = destinations.find(
      (dest) => dest.id === point.destination
    );

    return destination ? destination.name : '';
  });

  if (routeNames.length <= 3) {
    return routeNames.join(' — ');
  }

  return `${routeNames[0]} — ... — ${routeNames.at(-1)}`;
};

const calculateTripPrice = (points, offers) => {
  let totalPrice = 0;

  points.forEach((point) => {
    totalPrice += point.basePrice;

    const offersByType = offers.find(
      (offer) => offer.type === point.type
    );

    if (!offersByType) {
      return;
    }

    const selectedOffers = offersByType.offers.filter((offer) =>
      point.offers.includes(offer.id)
    );

    selectedOffers.forEach((offer) => {
      totalPrice += offer.price;
    });
  });

  return totalPrice;
};

const createTripInfoTemplate = (
  points,
  destinations,
  offers
) => {
  if (!points.length) {
    return '';
  }

  const sortedPoints = [...points].sort(
    (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))
  );

  const startDate = dayjs(sortedPoints[0].dateFrom)
    .format('MMM D');

  const endDate = dayjs(sortedPoints.at(-1).dateTo)
    .format('MMM D');

  const route = createTripRoute(
    sortedPoints,
    destinations
  );

  const totalPrice = calculateTripPrice(
    sortedPoints,
    offers
  );

  return `
    <section class="trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${route}
        </h1>

        <p class="trip-info__dates">
          ${startDate} — ${endDate}
        </p>
      </div>

      <p class="trip-info__cost">
        Total: €
        <span class="trip-info__cost-value">
          ${totalPrice}
        </span>
      </p>
    </section>
  `;
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({points, destinations, offers}) {
    super();

    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(
      this.#points,
      this.#destinations,
      this.#offers
    );
  }
}