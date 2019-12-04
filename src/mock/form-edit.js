import {cities, eventTypes} from "../const";
import {shuffleArray} from "../utils";

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, 
  non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. 
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, 
  sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
   Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. 
   In rutrum ac purus sit amet tempus.`;

const getRandomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDescriptionText = (text) => {
  let textSentences = new Array(...new Set(text.split(`.`)))
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence);

  textSentences = shuffleArray(textSentences);
  textSentences = textSentences.slice(0, getRandomRange(0, 3)).join(`. `);

  return textSentences ? `${textSentences}.` : ``;
};

const generateRandomDate = (targetDate, minDays = 0, maxDays) => {
  let targetDateCopy = new Date(targetDate.valueOf());
  const diffValue = getRandomRange(minDays, maxDays);

  targetDateCopy.setDate(targetDateCopy.getDate() + diffValue);
  targetDateCopy.setHours(getRandomRange(0, 23));
  targetDateCopy.setMinutes(getRandomRange(0, 59));
  return targetDateCopy;
};

const getPrice = (k, max) => {
  return getRandomRange(1, max) * k;
};

const options = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: getPrice(5, 15)
  },
  {
    type: `comfort`,
    name: `Switch to comfort class`,
    price: getPrice(100, 3)
  },
  {
    type: `meal`,
    name: `Add meal`,
    price: getPrice(5, 20)
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: getPrice(2, 10)
  },
  {
    type: `train`,
    name: `Travel by train`,
    price: getPrice(5, 20)
  },
];

const generateOptionsList = () => {
  return shuffleArray(options).slice(0, getRandomRange(0, 2));
};

const generatePhotos = () => {
  return new Array(5).fill(``).map(() =>
    `http://picsum.photos/300/150?r=${Math.random()}`
  );
};

const generateFormEdit = () => {

  const currentDate = Date.now();
  const date = generateRandomDate(currentDate, 2, 30);

  return {
    type: eventTypes[getRandomRange(0, eventTypes.length - 1)],
    city: cities[getRandomRange(0, cities.length - 1)],
    photos: new Set(generatePhotos()),
    text: generateDescriptionText(descriptionText),
    options: generateOptionsList(),
    price: getPrice(5, 40),
    dateStart: date,
    dateEnd: generateRandomDate(date, 0, 21),
  };
};

const generateTripCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFormEdit);
};

export {generateFormEdit, generateTripCards};
