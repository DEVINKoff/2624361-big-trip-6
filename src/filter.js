import {FilterType} from './const.js';

const isFuturePoint = (point) => new Date(point.dateFrom) > new Date();

const isPresentPoint = (point) => {
  const now = new Date();

  return (
    new Date(point.dateFrom) <= now &&
    new Date(point.dateTo) >= now
  );
};

const isPastPoint = (point) => new Date(point.dateTo) < new Date();

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isFuturePoint),
  [FilterType.PRESENT]: (points) => points.filter(isPresentPoint),
  [FilterType.PAST]: (points) => points.filter(isPastPoint)
};