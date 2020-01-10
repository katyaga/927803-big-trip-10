export default class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.dateStart = data[`date_from`];
    this.dateEnd = data[`date_to`];
    this.destination = data[`destination`];
    this.price = data[`base_price`];
    this.offers = data[`offers`];
    this.isFavorite = data[`is_favorite`];
  }

  toRAW() {
    return {
      'id': `${this.id}`,
      'type': this.type,
      'city': this.destination,
      'dateStart': new Date(this.dateStart).toISOString(),
      'dateEnd': new Date(this.dateEnd).toISOString(),
      'price': this.price,
      'isFavorite': this.isFavorite,
      'options': this.offers,
    };
  }

  static parsePoint(data) {
    return new Point(data);
  }

  static parsePoints(data) {
    return data.map(Point.parsePoint);
  }
}
