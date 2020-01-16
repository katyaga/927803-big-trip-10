import moment from 'moment';

export const formatDateTime = (date) => {
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

export const formatTime = (time) => {
  return moment(time).format(`HH:mm`);
};

export const getDurationDateTime = (start, end) => {
  const dateStart = moment(start);
  const dateEnd = moment(end);

  const duration = moment.duration(dateEnd.diff(dateStart));

  const getDays = () => {
    const days = duration.get(`days`);
    if (days) {
      return `${days < 10 ? `0${days}D ` : `${days}D`} `;
    } else {
      return ``;
    }
  };
  const getHours = () => {
    const hours = duration.get(`hours`);
    if (hours) {
      return `${hours < 10 ? `0${hours}H ` : `${hours}H `}`;
    } else {
      return ``;
    }
  };

  const getMinutes = () => {
    const minutes = duration.get(`minutes`);
    if (minutes) {
      return `${minutes < 10 ? `0${minutes}M ` : `${minutes}M `}`;
    } else {
      return ``;
    }
  };

  return (`${getDays()}${getHours()}${getMinutes()}`);
};

export const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export const getRandomBoolean = () => {
  return (Math.random() - 0.5) > 0;
};

export const getRandomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomElement = (arr) => {
  const rand = getRandomRange(0, arr.length - 1);
  return arr[rand];
};

export const generateTripDays = (tripCards) => {
  let tripDays = [];
  let currentCards = [];

  const sortTripCards = tripCards.slice().sort((a, b) => a.dateStart - b.dateStart);

  // console.log(tripCards, sortTripCards);

  sortTripCards.forEach((card, i, cards) => {
    let previousCard = i > 0 ? cards[i - 1] : null;

    if (previousCard && card.dateStart.getDate() !== previousCard.dateStart.getDate()) {
      tripDays.push(currentCards);
      currentCards = [];
    }
    currentCards.push(card);
    if (i === cards.length - 1) {
      tripDays.push(currentCards);
    }
  });

  return tripDays;
};

export const HIDDEN_CLASS = `visually-hidden`;

export const capitalize = (s) => {
  if (typeof s !== `string`) {
    return ``;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

