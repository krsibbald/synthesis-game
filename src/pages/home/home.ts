import { Component, Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, AlertController } from 'ionic-angular';
import { CardPopoverComponent } from '../../components/card-popover/card-popover';
import { DiscardPopoverComponent } from '../../components/discard-popover/discard-popover';

import { CardComponent } from '../../components/card/card';
import { Card } from '../../models/card';
import { GameProvider } from '../../providers/game/game'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myHand: Card[];
  myLab: Card[];
  compHand: Card[];
  compLab: Card[];
  constructor(public navCtrl: NavController, 
    private popoverCtrl: PopoverController, 
    public gameProvider: GameProvider,
    private alertCtrl: AlertController) {
    this.myHand = gameProvider.getMyHand();
    this.myLab = gameProvider.getMyLab();
    this.compHand = this.gameProvider.computer.hand;
    this.compLab = this.gameProvider.computer.lab;
  }

  presentCardPopover(ev, card: Card, i: number, origin: string) {
    let popover = this.popoverCtrl.create(CardPopoverComponent, 
      {"card": card, "i": i, 'origin': origin
    });
    popover.present({
      // ev: ev
      //display in center of screen
    });
  }

  presentDiscardPopover(ev, fromPile: string) {
    let popover = this.popoverCtrl.create(DiscardPopoverComponent, 
      {fromPile: fromPile
    });
    popover.present({
      ev: ev
      //display in center of screen
    });
  }

  humanCanSubmitReaction(){
    return this.gameProvider.canSubmitReaction(this.gameProvider.human);
  }

  submitReaction(){
    var points = 0;
    var message = "";
    try{
      points = this.gameProvider.trySubmitReaction(this.gameProvider.human);
      message = "Nice work!";
      this.goodReactionAlert(points);
    }
    catch(err){ //this catches too wide of a net. Clean up later
      this.badReactionAlert();
    }

  }

  goodReactionAlert(points: number){
    var phrase = "";
    if(points > 1){
      phrase = "You got " + points + " points";
    }else{
      phrase = "You got 1 point.";}
    let alert = this.alertCtrl.create({
      title: "Nice work!", 
      subTitle: phrase,
      buttons: ['Thanks']
      });
      alert.present();
  }

  badReactionAlert(){
    let alert = this.alertCtrl.create({
      title: "Invalid Card Combination", 
      subTitle: "You can not play those cards. Choose a different combination and try again.",
      buttons: ['OK']
      });
      alert.present();
  }

  buyCard(i: number){
    var result = this.gameProvider.humanTryBuyCard(i);
    if(result){
      this.goodBuyAlert(result);
    }else{
      this.badBuyAlert();
    }
  }

  goodBuyAlert(card: Card){
    let alert = this.alertCtrl.create({
      title: "Card purchased", 
      subTitle: card.name + "<img src="+card.icon+">" ,
      buttons: ['OK']
      });
      alert.present();
  }
  badBuyAlert(){
    let alert = this.alertCtrl.create({
      title: "Unable to buy card", 
      subTitle: "",
      buttons: ['OK']
      });
      alert.present();
  }

  humanCanEndTurn(){
    return this.gameProvider.canEndTurn(this.gameProvider.human);
  }

  endTurn(){
    if(this.gameProvider.humanTryEndTurn()){
      if (!this.checkForGameEnd()){
      
        // this.goodEndTurnAlert();
        var speed = 2000;
        if(this.gameProvider.playComputerTurn(speed)){
          this.goodEndTurnAlert();
        }
      }
    }else{
      this.badEndTurnAlert();
    }
  }

  goodEndTurnAlert(){
    let alert = this.alertCtrl.create({
      title: "Turn ended", 
      subTitle: "",
      buttons: ['OK']
      });
      alert.present();
  }
  badEndTurnAlert(){
    let alert = this.alertCtrl.create({
      title: "Unable to end turn", 
      subTitle: "",
      buttons: ['OK']
      });
      alert.present();
  }

  checkForGameEnd(){
    if(this.gameProvider.didGameEnd()){
       this.winGameAlert();
      // this.gameProvider.endGame();
      // if (this.gameProvider.winner == this.gameProvider.human){
      //   this.winGameAlert();
      // } else {
      //   this.loseGameAlert();
      // }
      return true;
    }else{
      return false;
    }

  }

  winGameAlert(){
    let alert = this.alertCtrl.create({
      title: "You won!", 
      subTitle: "",
      buttons: ['Hurray!']
      });
      alert.present();
  }
  loseGameAlert(){
    let alert = this.alertCtrl.create({
      title: "You lost.", 
      subTitle: "Better luck next time.",
      buttons: ['OK']
      });
      alert.present();
  }

  isComputersTurn(){
    return this.gameProvider.whoseTurn == this.gameProvider.computer;
  }

}
