import dayjs from 'dayjs';

const humanizeDate = (dueDate, format) =>
  dueDate ? dayjs(dueDate).format(format) : '';

const getDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  if (diff < 60) {
    return `${diff}M`;
  }

  if (diff < 1440) {
    return `${Math.floor(diff / 60)}H ${diff % 60}M`;
  }

  return `${Math.floor(diff / 1440)}D ${Math.floor((diff % 1440) / 60)}H ${diff % 60}M`;
};

export { humanizeDate, getDuration };
