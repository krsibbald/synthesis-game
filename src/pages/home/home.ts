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
  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController) {}

  presentCardPopover(ev) {
    let popover = this.popoverCtrl.create(CardPopoverComponent, {
    });
    popover.present({
      ev: ev
    });
  }

  

}
