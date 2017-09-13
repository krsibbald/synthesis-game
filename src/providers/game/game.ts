import { Injectable } from '@angular/core';
import { Card} from '../../models/card';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { Player } from '../../models/player';
/*
  Generated class for the GameProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

const CARDCOMBOS= {
  1:{3: true}, 
  2:{3: true}, 
  3:{1: true,2: true}
};

@Injectable()
export class GameProvider {
  human: Player;
  computer: Player;

  players: Player[] = [];

  stockroom: Card[] = [];
  benchtop: Card[] = [];
  chemicalWaste: Card[] = [];

  cards: Card[];



  constructor(public cardServiceProvider: CardServiceProvider) {
    this.human = new Player();
    this.computer = new Player();
    this.players = [this.human, this.computer];

    this.cards = cardServiceProvider.getCards();
    this.cards.forEach((card: Card) => {
      //starting cards for myDeck & computers deck
      if(card.startHandNum > 0) {
        var times = card.startHandNum;
        for(var i=0; i < times; i++){
          this.players.forEach((player: Player) => {
            player.deck.push(card);
          });
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

   this.players.forEach((player: Player) => {
      this.shuffle(player.deck);
      this.dealHand(player);
    });
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

  dealHand(player: Player){
    //number of cards in deck is 5 or more
    var times = 5;
    for(var i=0; i < times; i++){
      if (player.deck.length == 0){
        this.refillDeck(player);
      }
      player.hand.push(player.deck.pop());
    }
  }

  refillDeck(player: Player){
    player.deck.push.apply(player.deck, player.recycle);
    player.recycle.length = 0;
    this.shuffle(player.deck);
  }

  dealBenchtop(){
    var times = 5;
    for(var i=0; i < times; i++){
      this.benchtop.push(this.stockroom.pop());
    }
  }

  playCard(i: number){
    this.human.lab.push(this.human.hand.splice(i,1)[0]);
  }

  endTurn(){
    //is this play valid? 
    //if yes
      //how many points?
      //end turn
    //if no
      //error
      //don't end turn
  }

}
