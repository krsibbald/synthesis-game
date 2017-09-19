import { NgModule } from '@angular/core';
import { CardPopoverComponent } from './card-popover/card-popover';
import { CardComponent } from './card/card';
import { DiscardPopoverComponent } from './discard-popover/discard-popover';
@NgModule({
	declarations: [CardPopoverComponent,
    CardComponent,
    DiscardPopoverComponent],
	imports: [],
	exports: [CardPopoverComponent,
    CardComponent,
    DiscardPopoverComponent]
})
export class ComponentsModule {}
