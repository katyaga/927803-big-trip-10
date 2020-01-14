export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.destination = data[`destination`];
    this.dateStart = new Date(data[`date_from`]);
    this.dateEnd = new Date(data[`date_to`]);
    this.destination = data[`destination`];
    this.price = data[`base_price`];
    this.options = data[`offers`] ? setChecked(data[`offers`]) : [];
    this.isFavorite = data[`is_favorite`];
  }

  toRAW() {
    return {
      'id': `${this.id}`,
      'type': this.type,
      'destination': this.destination,
      'dateStart': this.dateStart.toISOString(),
      'dateEnd': this.dateEnd.toISOString(),
      'price': this.price,
      'isFavorite': this.isFavorite,
      'options': this.options,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }
}

const setChecked = (arr) => {
  arr.forEach((elem) => {
    elem.checked = true;
  });
  console.log(arr);

  return arr;
};
