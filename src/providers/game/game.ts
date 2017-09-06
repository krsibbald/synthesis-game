import { Injectable } from '@angular/core';
import { Card} from '../../models/card';
import { CardServiceProvider } from '../../providers/card-service/card-service';

/*
  Generated class for the GameProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GameProvider {
  
  myDeck: Card[];
  myHand: Card[];
  myRecycle: Card[];

  compDeck: Card[];
  compHand: Card[];
  compRecycle: Card[];

  stockroom: Card[];
  benchtop: Card[];
  chemicalWaste: Card[];

  cards: Card[];
  constructor(public cardServiceProvider: CardServiceProvider) {
    this.cards = cardServiceProvider.getCards();
    this.cards.forEach((card: Card) => {
      if(card.startHandNum > 0) {
        myDeck.push(card);
        compDeck.push(card);
      }
      if(card.stockroomNum > 0) {
        stockroom.push(card);
      }
    }
    );
    //add cards to my hand
    //add cards to computers hand
    //add cards to stockroom
  }

}
