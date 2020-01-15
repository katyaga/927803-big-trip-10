export const cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`,
];

export const eventTypes = [
  {
    name: `taxi`,
    title: `Taxi`,
    group: `transfer`,
  },
  {
    name: `bus`,
    title: `Bus`,
    group: `transfer`,
  },
  {
    name: `train`,
    title: `Train`,
    group: `transfer`,
  },
  {
    name: `ship`,
    title: `Ship`,
    group: `transfer`,
  },
  {
    name: `transport`,
    title: `Transport`,
    group: `transfer`,
  },
  {
    name: `drive`,
    title: `Drive`,
    group: `transfer`,
  },
  {
    name: `flight`,
    title: `Flight`,
    group: `transfer`,
  },
  {
    name: `check-in`,
    title: `Check-in`,
    group: `activity`,
  },
  {
    name: `sightseeing`,
    title: `Sightseeing`,
    group: `activity`,
  },
  {
    name: `restaurant`,
    title: `Restaurant`,
    group: `activity`,
  },
];

export const transferNames = eventTypes.map(
    (eventType) => eventType.group === `transfer` && eventType.name
).filter((item) => item);

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const MonthNames = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];

