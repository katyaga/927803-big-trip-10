import moment from 'moment';

export const formatDateTime = (date) => {
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

export const formatTime = (time) => {
  return moment(time).format(`HH:mm`);
};

export const getDurationDateTime = (start, end) => {
  const dateStart = moment(start);
  const dataEnd = moment(end);

  const days = dataEnd.diff(dateStart, `days`);
  dateStart.add(days, `days`);

  const hours = dataEnd.diff(dateStart, `hours`);
  dateStart.add(hours, `hours`);

  const minutes = dataEnd.diff(dateStart, `minutes`);

  return (`${days ? `${moment(days).format(`DD`)}D` : ``}
    ${hours ? `${moment(hours).format(`HH`)}H` : ``}
    ${minutes ? `${moment(minutes).format(`MM`)}M` : ``}`);
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

