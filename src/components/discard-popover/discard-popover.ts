import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello DiscardPopoverComponent Component');
    this.text = 'Hello World';
  }

}
