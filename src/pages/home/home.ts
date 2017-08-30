import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { CardPopoverComponent } from '../../components/card-popover/card-popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController) {}

  presentCardPopover(ev) {
    let popover = this.popoverCtrl.create(CardPopoverComponent, {
    });
    popover.present({
      ev: ev
    });
  }

  

}
