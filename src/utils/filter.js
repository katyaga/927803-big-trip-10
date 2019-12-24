import {FilterType} from '../const.js';

const getFuturePoints = (points, date) => {
  return points.filter((point) => {
    const {dateEnd} = point;

    if (!dateEnd) {
      return false;
    }

    return dateEnd > date;
  });
};

const getPastPoints = (points, date) => {
  return points.filter((point) => {
    const {dateEnd} = point;

    if (!dateEnd) {
      return false;
    }

    return dateEnd < date;
  });
};

export const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return points;
    case FilterType.FUTURE:

      return getFuturePoints(points, nowDate);
    case FilterType.PAST:
      return getPastPoints(points, nowDate);
  }

  return points;
};
