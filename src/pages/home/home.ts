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
  constructor(public navCtrl: NavController, 
    private popoverCtrl: PopoverController, 
    public gameProvider: GameProvider,
    private alertCtrl: AlertController) {
    this.myHand = gameProvider.getMyHand();
    this.myLab = gameProvider.getMyLab();
  }

  presentCardPopover(ev) {
    let popover = this.popoverCtrl.create(CardPopoverComponent, {
    });
    popover.present({
      ev: ev
    });
  }

  submitReaction(){
    var points = 0;
    var message = "";
    try{
      points = this.gameProvider.trySubmitReaction();
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

}
