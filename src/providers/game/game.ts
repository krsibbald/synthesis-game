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
  
  myDeck: Card[] = [];
  myHand: Card[] = [];
  myRecycle: Card[] = [];

  compDeck: Card[] = [];
  compHand: Card[] = [];
  compRecycle: Card[] = [];

  stockroom: Card[] = [];
  benchtop: Card[] = [];
  chemicalWaste: Card[] = [];

  cards: Card[];
  constructor(public cardServiceProvider: CardServiceProvider) {
    this.cards = cardServiceProvider.getCards();
    this.cards.forEach((card: Card) => {
      //starting cards for myDeck & computers deck
      if(card.startHandNum > 0) {
        var times = card.startHandNum;
        for(var i=0; i < times; i++){
          this.myDeck.push(card);
          this.compDeck.push(card);
          this.myHand.push(card);
        }

      }
      //starting cards for stockroom deck
      if(card.stockroomNum > 0) {
        var times = card.stockroomNum;
        for(var i=0; i < times; i++){
          this.stockroom.push(card);
        }
      }
    }
    );
  }

  getMyHand(){
    return this.myHand;
  }

}
