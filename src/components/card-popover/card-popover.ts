import { Component } from '@angular/core';
import { PopoverController, NavParams, ViewController } from 'ionic-angular';
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
  origin: string; //hand or benchtop

  constructor(private navParams: NavParams, 
    public gameProvider: GameProvider, 
    public viewController: ViewController) {
    this.params = navParams;
    this.card = navParams.get('card');
    this.i = navParams.get('i');
    this.origin = navParams.get('origin')
  }

  humanCanPlayCard(){
    return this.gameProvider.whoseTurn == this.gameProvider.human 
    && this.gameProvider.state == 'reaction'
    && this.origin == 'hand';
  }

  humanPlayCard(i: number){
    this.gameProvider.humanPlayCard(i);
    this.viewController.dismiss();
  }

  humanCanBuyCard(){
    return this.gameProvider.canBuyCard(this.gameProvider.human)
    && this.origin == 'benchtop';
  }
  humanBuyCard(i: number){
    this.gameProvider.humanTryBuyCard(i);
    this.viewController.dismiss();
  }

  humanCanSendToWaste(){
    return this.gameProvider.canSendToWaste(this.gameProvider.human)
    && this.origin == 'benchtop';
  }
  humanSendToWaste(i: number){
    this.gameProvider.humanSendToWaste(i);
    this.viewController.dismiss();
  }
}
