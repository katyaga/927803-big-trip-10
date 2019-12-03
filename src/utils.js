const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatDateTime = (date) => {
  const day = castTimeFormat(date.getDate());
  const month = castTimeFormat(date.getMonth() + 1);
  const year = String(date.getFullYear()).slice(2);
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

export const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

