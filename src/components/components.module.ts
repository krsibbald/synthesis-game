import { NgModule } from '@angular/core';
import { CardPopoverComponent } from './card-popover/card-popover';
import { CardComponent } from './card/card';
@NgModule({
	declarations: [CardPopoverComponent,
    CardComponent],
	imports: [],
	exports: [CardPopoverComponent,
    CardComponent]
})
export class ComponentsModule {}
