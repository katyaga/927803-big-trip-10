// export default class Offer {
//   constructor(data) {
//     this.name = data[`name`];
//     this.description = data[`description`];
//     this.pictures = new Set(data[`pictures`]);
//   }
//
//   toRAW() {
//     return {
//       'name': this.name,
//       'description': this.description,
//       'pictures': this.pictures
//     };
//   }
//
//   static parseOffer(data) {
//     return new Offer(data);
//   }
//
//   static parseOffers(data) {
//     return data.map(Offer.parseOffer);
//   }
//
//   static clone(data) {
//     return new Offer(data.toRAW());
//   }
// }
