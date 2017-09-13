import { Injectable } from '@angular/core';
import { Card} from '../../models/card';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { Player } from '../../models/player';
/*
  Generated class for the GameProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class GameProvider {
  
  human: Player = new Player;
  human.id = 1; 
  human.name = "Human";

  computer: Player = new Player;
  computer.id = 2;
  computer.name = 'Computer';

  stockroom: Card[] = [];
  benchtop: Card[] = [];
  chemicalWaste: Card[] = [];

  cards: Card[];

  constructor(public cardServiceProvider: CardServiceProvider) {
    this.human = new Player();
    this.computer = new Player();

    this.cards = cardServiceProvider.getCards();
    this.cards.forEach((card: Card) => {
      //starting cards for myDeck & computers deck
      if(card.startHandNum > 0) {
        var times = card.startHandNum;
        for(var i=0; i < times; i++){
          this.human.deck.push(card);
          this.computer.deck.push(card);
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

    this.shuffle(this.human.deck);
    this.shuffle(this.computer.deck);

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
    return this.human.hand;
  }
  getMyLab(){
    return this.human.lab;
  }


  dealMyHand(){
    //number of cards in deck is 5 or more
    var times = 5;
    for(var i=0; i < times; i++){
      if (this.human.deck.length == 0){
        this.refillMyDeck();
      }
      this.human.hand.push(this.human.deck.pop());
    }
  }

  dealCompDeck(){
    var times = 5;
    for(var i=0; i < times; i++){
      this.computer.hand.push(this.computer.deck.pop());
    }
  }

  dealBenchtop(){
    var times = 5;
    for(var i=0; i < times; i++){
      this.benchtop.push(this.stockroom.pop());
    }
  }

  refillMyDeck(){
    this.human.deck.push.apply(this.human.deck, this.human.recycle);
    this.human.recycle.length = 0;
    this.shuffle(this.human.deck);
  }

  playCard(i: number){
    this.human.lab.push(this.human.hand.splice(i,1)[0] );
  }

}
