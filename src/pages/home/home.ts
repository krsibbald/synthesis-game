import { Component, Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController, AlertController } from 'ionic-angular';
import { CardPopoverComponent } from '../../components/card-popover/card-popover';
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

  presentCardPopover(ev) {
    let popover = this.popoverCtrl.create(CardPopoverComponent, {
    });
    popover.present({
      ev: ev
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
    if(this.gameProvider.humanTryBuyCard(i)){
      this.goodBuyAlert();
    }else{
      this.badBuyAlert();
    }
  }

  goodBuyAlert(){
    let alert = this.alertCtrl.create({
      title: "Card purchased", 
      subTitle: "Yay!",
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
      this.goodEndTurnAlert();
      var speed = 2000;
      this.gameProvider.playComputerTurn(speed);
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

}
