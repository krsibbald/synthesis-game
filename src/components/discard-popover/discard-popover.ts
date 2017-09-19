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
  constructor(private navParams: NavParams, 
    public gameProvider: GameProvider) {
    this.cards = this.gameProvider.chemicalWaste;
  }

}
