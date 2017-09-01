import { Injectable } from '@angular/core';
import { CardModel } from '../../models/card-model';

/*
  Generated class for the CardServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CardServiceProvider {
  cards: CardModel[];

  constructor() {
    this.cards = [{
      id: 1,
      name: 'n-Propyl chloride',
      points: 1,
      reagent1: '1o Alkyl halide',
      reagent2: 'Electrophile',
      notes: 'Electrophile for SN2 reactions.',
      image: 'assets/img/cards/large/card1.png'
    },{
      id: 2,
      name: '2-Chloro-2-methylpropane',
      points: 1,
      reagent1: '3o Alkyl halide',
      reagent2: 'Electrophile',
      notes: 'Electrophile for SN1, E1, and E2 reactions.',
      image: 'assets/img/cards/large/card1.png'
    }];
  }


  getCards(){
    return this.cards;
  }

}
