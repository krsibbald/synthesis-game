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
  //true is last item in hand
  1:{3: true}, 
  2:{3: true}, 
  3:{1: true,2: true}
};

@Injectable()
export class GameProvider {
  human: Player;
  computer: Player;

  players: Player[] = [];
  whoseTurn: Player;
  state: string = 'reaction';//'reaction', 'buy'

  stockroom: Card[] = [];
  benchtop: Card[] = [];
  chemicalWaste: Card[] = [];

  cards: Card[];

  constructor(public cardServiceProvider: CardServiceProvider) {
    this.human = new Player();
    this.human.id = 1;
    this.human.name = 'human';

    this.computer = new Player();
    this.computer.id = 2;
    this.computer.name = 'computer';
    this.players = [this.human, this.computer];
    this.whoseTurn = this.human;

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
   this.dealBenchtop();
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

  humanPlayCard(i: number){
    this.playCard(i, this.human);
  }

  playCard(i: number, player: Player){
   player.lab.push(player.hand.splice(i,1)[0]); 
  }
  humanUnplayCard(i: number){
    this.unplayCard(i, this.human);
  }

  unplayCard(i: number, player: Player){
    player.hand.push(player.lab.splice(i,1)[0]);
  }

  canSubmitReaction(){
    return this.state == 'reaction';
  }
  trySubmitReaction(player: Player){
    if(this.canSubmitReaction() && this.validPlay(player)){
       //is this play valid? 
      //if yes
        //how many points?
      var points = 0;
      player.lab.forEach((c:Card)=>{
        points += c.points;
      })
      //end turn
      if(player == this.computer){
        this.whoseTurn = this.human;
      }else{
        this.whoseTurn = this.computer;//other player
      }
      player.totalPoints += points;
      player.spendingPoints = points;
      this.state = 'buy';
      return points;

    }else{
      //if no
      //error
      throw 'InvalidCardCombination';
      //don't end turn
    }
  }

  canBuyCard(){
    return this.state == 'buy';
  }
  tryBuyCard(i: number){
    if(this.canBuyCard()){
      var cardToBuy;
      cardToBuy = this.benchtop[i];
      var points;
      points = cardToBuy.points;
      if(points <= this.human.spendingPoints){
        //spend points
        this.human.spendingPoints -= points;

        //move card from benchtop to my hand
        //card to put into benchtop
        var replacementCard = this.stockroom.pop();
        this.human.recycle.push(this.benchtop.splice(i,1, replacementCard)[0]);
        return true; 
      }else{
        return false;
      }
    }else{
      throw 'WrongState';
    }

  }

  canEndTurn(){
    return (this.state == 'buy');
  }
  tryEndTurn(){
    if(this.canEndTurn()){
      //set player to next player
      this.whoseTurn = this.computer;
      
      //set state to buy
      this.state= 'buy';
      //move any cards currently in players deck to recycle
      this.human.hand.forEach((c: Card)=>{
        //TODO may be a better way to move cards in bulk
        this.human.recycle.push(this.human.hand.pop());
      });
      //deal player a new hand
      this.dealHand(this.human);
      return true;
    }else{
      return false;
    }
  }

  playComputerTurn(){
    if(this.whoseTurn == this.computer){
      //try playing two cards in hand
        //add two cards to lab
        //try to submit
      //if that doesn't work, just play first card in hand
      //try to buy first card that you have enough points for
      //end turn
      return true;
    }else{
      return false;
    }
  }

  validPlay(player: Player){
    var answerToCheck = []
    player.lab.forEach((c: Card)=>{
      answerToCheck.push(c.id);
    });
    var len = answerToCheck.length;
    answerToCheck.push(true); //marks the last card in hand
    
    if(len == 0) {
     return false;
    } else if (len == 1) {
      return true;
    } else if (len == 2){
      if(CARDCOMBOS[answerToCheck[0]][answerToCheck[1]]){
        return true;
      }else{
        return false;
      }
    } else {
      return false;
    }
  }

}
