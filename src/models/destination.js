// export default class Destination {
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
//   static parseDestination(data) {
//     return new Destination(data);
//   }
//
//   static parseDestinations(data) {
//     return data.map(Destination.parseDestination);
//   }
//
//   static clone(data) {
//     return new Destination(data.toRAW());
//   }
// }
