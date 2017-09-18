import { Component } from '@angular/core';
import { PopoverController, NavParams } from 'ionic-angular';
import { Card } from '../../models/card';
import { GameProvider } from '../../providers/game/game';

/**
 * Generated class for the CardPopoverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'card-popover',
  templateUrl: 'card-popover.html'
})
export class CardPopoverComponent {
  card: Card;
  params: any;
  i: number;

  constructor(private navParams: NavParams, public gameProvider: GameProvider) {
    this.params = navParams;
    this.card = navParams.get('card');
    this.i = navParams.get('i');
  }

}
