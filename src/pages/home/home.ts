import { Component, Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController, public gameProvider: GameProvider) {
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

  endTurn(){
    var points = 0;
    var message = "";
    try{
      points = this.gameProvider.tryEndTurn();
      message = "Nice work!";
    }
    catch(err){ //this catches too wide of a net. Clean up later
      message = "Invalid Card Combination"
    }

  }

}
