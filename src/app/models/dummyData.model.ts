// export class DummyData {
//   cardNumber: string;
//   carNumber: string;
//   liters: number;
//   fillDateTime: string;

//   constructor(cardNumber: string, carNumber: string, liters: number, fillDateTime: string) {
//     this.cardNumber = cardNumber;
//     this.carNumber = carNumber;
//     this.liters = liters;
//     this.fillDateTime = fillDateTime;
//   }
// }
export class DummyData {
  cardNumber: string;
  carNumber: string;
  data: {
    liters: number;
    fillDateTime: string;
  }[];

  constructor(cardNumber: string, carNumber: string, data: { liters: number, fillDateTime: string }[]) {
    this.cardNumber = cardNumber;
    this.carNumber = carNumber;
    this.data = data;
  }
}
