import {FILTER_TYPE} from '../const.js';

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
    case FILTER_TYPE.EVERYTHING:
      return points;
    case FILTER_TYPE.FUTURE:

      return getFuturePoints(points, nowDate);
    case FILTER_TYPE.PAST:
      return getPastPoints(points, nowDate);
  }

  return points;
};
