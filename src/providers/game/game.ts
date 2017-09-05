import { Injectable } from '@angular/core';
import { CardModel } from '../../models/card-model';

/*
  Generated class for the GameProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GameProvider {
  
  myDeck: CardModel[];
  myHand: CardModel[];
  myRecycle: CardModel[];

  compDeck: CardModel[];
  compHand: CardModel[];
  compRecycle: CardModel[];

  stockroom: CardModel[];
  benchtop: CardModel[];
  chemicalWaste: CardModel[];

  constructor() {
    //add cards to my hand
    //add cards to computers hand
    //add cards to stockroom
  }

}
