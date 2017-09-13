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
  myLab: Card[] = [];

  compDeck: Card[] = [];
  compHand: Card[] = [];
  compRecycle: Card[] = [];
  compLab: Card[] = [];

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
        }

      }
      //starting cards for stockroom deck
      if(card.stockroomNum > 0) {
        var times = card.stockroomNum;
        for(var i=0; i < times; i++){
          this.stockroom.push(card);
        }
      }
    });

    this.shuffle(this.myDeck);
    this.shuffle(this.compDeck);

    this.dealMyHand();
    this.dealCompDeck();
  }

  getRandom(min, max) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  shuffle(array: Card[]): Card[] {
    // https://basarat.gitbooks.io/algorithms/docs/shuffling.html
  
    // if it's 1 or 0 items, just return
    if (array.length <= 1) return array;

    // For each index in array
    for (let i = 0; i < array.length; i++) {

      // choose a random not-yet-placed item to place there
      // must be an item AFTER the current item, because the stuff
      // before has all already been placed
      const randomChoiceIndex = this.getRandom(i, array.length - 1);

      // place our random choice in the spot by swapping
      [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
    }

    return array;
  }

  getMyHand(){
    return this.myHand;
  }
  getMyLab(){
    return this.myLab;
  }


  dealMyHand(){
    //number of cards in deck is 5 or more
    var times = 5;
    for(var i=0; i < times; i++){
      if (this.myDeck.length == 0){
        this.refillMyDeck();
      }
      this.myHand.push(this.myDeck.pop());
    }
  }

  dealCompDeck(){
    var times = 5;
    for(var i=0; i < times; i++){
      this.compHand.push(this.compDeck.pop());
    }
  }

  dealBenchtop(){
    var times = 5;
    for(var i=0; i < times; i++){
      this.benchtop.push(this.stockroom.pop());
    }
  }

  refillMyDeck(){
    this.myDeck.push.apply(this.myDeck, this.myRecycle);
    this.myRecycle.length = 0;
    this.shuffle(this.myDeck);
  }

  playCard(i: number){
    this.myLab.push(this.myHand.splice(1,1)[0] );
  }

}
