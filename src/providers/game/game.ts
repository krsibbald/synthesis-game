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
  anySentToWaste: boolean = false;

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
   this.shuffle(this.stockroom);
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

  moveAllCardsFromTo(fromDeck: Card[], toDeck: Card[]){
    toDeck.push.apply(toDeck, fromDeck);
    fromDeck.length = 0;
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
    this.moveAllCardsFromTo(player.recycle, player.deck);
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

  canSubmitReaction(player: Player){
    return this.state == 'reaction' && this.whoseTurn == player;
  }
  trySubmitReaction(player: Player){
    if(this.canSubmitReaction(player) && this.validPlay(player)){
       //is this play valid? 
      //if yes
        //how many points?
      var points = 0;
      player.lab.forEach((c:Card)=>{
        points += c.points;
      })

      player.totalPoints += points;
      player.spendingPoints = points;
      this.state = 'buy';
      return points;

    }else{
      //if no
      //error
      throw 'InvalidCardCombination';
      //don't change to buy state
    }
  }

  canBuyCard(player: Player){
    //doesn't check if they have enough points, just if its in right state
    return this.state == 'buy' && this.whoseTurn == player;
  }
  humanTryBuyCard(i: number){
    return this.tryBuyCard(i, this.human);
  }
  tryBuyCard(i: number, player: Player){
    if(this.canBuyCard(player)){
      var cardToBuy;
      cardToBuy = this.benchtop[i];
      var points;
      points = cardToBuy.points;
      if(points <= player.spendingPoints){
        //spend points
        player.spendingPoints -= points;

        //move card from benchtop to my hand
        //card to put into benchtop
        var replacementCard = this.stockroom.pop();
        player.recycle.push(this.benchtop.splice(i,1, replacementCard)[0]);
        return cardToBuy; 
      }else{
        return false;
      }
    }else{
      throw 'WrongState';
    }

  }

  canSendToWaste(player: Player){
    return this.state == 'buy' 
    && this.whoseTurn == player 
    && this.anySentToWaste == false; 
    //TODO need a check to see if any others have been sent this turn
  }

  humanSendToWaste(i: number){
    var cardToWaste;
    cardToWaste = this.benchtop[i];
    //move card from benchtop to chemical waste
    //card to put into benchtop
    var replacementCard = this.stockroom.pop();
    this.chemicalWaste.push(this.benchtop.splice(i,1, replacementCard)[0]);
    this.anySentToWaste = true;
  }

  canEndTurn(player: Player){
    return this.state == 'buy' && this.whoseTurn == player;
  }
  humanTryEndTurn(){
    return this.tryEndTurn(this.human);
  }
  tryEndTurn(player: Player){
    if(this.canEndTurn(player)){

      //move any cards currently in players hand to recycle
      this.moveAllCardsFromTo(player.hand, player.recycle);
      //move any cards currently in players lab to recycle
      this.moveAllCardsFromTo(player.lab, player.recycle);
      // player.hand.forEach((c: Card)=>{
      //   //TODO may be a better way to move cards in bulk
      //   player.recycle.push(player.hand.pop());
      // });
      // player.lab.forEach((c: Card)=>{
      //   //TODO may be a better way to move cards in bulk
      //   player.recycle.push(player.lab.pop());
      // });
      //deal player a new hand
      this.dealHand(player);

      //set player to next player
      if(player == this.computer){
        this.whoseTurn = this.human;
      }else{
        this.whoseTurn = this.computer;//other player
      }
      
      this.anySentToWaste = false;
      //set state to reaction
      this.state= 'reaction';
      return true;
    }else{
      return false;
    }
  }

  playComputerTurn(speed: number){
    if(this.whoseTurn == this.computer){
      //try playing two cards in hand
        //add two cards to lab
        var temp = this; 
        setTimeout(function(){
          temp.playCard(0, temp.computer);
        }, speed);
        setTimeout(function(){
          temp.playCard(0, temp.computer);

          if (!temp.validPlay(temp.computer)){
            temp.unplayCard(0, temp.computer);
          }
        }, speed*2);

        //try to submit
        setTimeout(function(){
          temp.trySubmitReaction(temp.computer);
        }, speed*3);
        
        //now in buy phase
        //try to buy every card
      [0,1,2,3,4].forEach((i: number) => {
         setTimeout(function(){
           temp.tryBuyCard(i, temp.computer);
         }, speed*4);
       });
      
      //try to buy first card that you have enough points for
      //end turn
      setTimeout(function(){
        temp.tryEndTurn(temp.computer);
      }, speed*5);
      
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
