import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

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

  text: string;

  constructor() {
    console.log('Hello CardPopoverComponent Component');
    this.text = 'Hello World';
  }

}
