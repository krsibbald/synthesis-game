import { Component } from '@angular/core';
import { PopoverController, NavParams, ViewController } from 'ionic-angular';
import { Card } from '../../models/card';
import { GameProvider } from '../../providers/game/game';

/**
 * Generated class for the DiscardPopoverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'discard-popover',
  templateUrl: 'discard-popover.html'
})
export class DiscardPopoverComponent {
  cards: Card[];
  origin: string;
  title: string;
  constructor(private navParams: NavParams, 
    public gameProvider: GameProvider) {
    this.origin = navParams.get('fromPile') //waste, computer, human
    if (this.origin == 'waste'){
      this.cards = this.gameProvider.chemicalWaste;
      this.title = "Chemical Waste";
    } else if(this.origin == 'human'){
      this.cards = this.gameProvider.human.recycle;
      this.title = "My Recycle";
    } else if (this.origin == 'computer'){
      this.cards = this.gameProvider.computer.recycle;
      this.title = "Computer's Recycle";
    } else {
      throw "InvalidOriginType";
    }
  }

}
