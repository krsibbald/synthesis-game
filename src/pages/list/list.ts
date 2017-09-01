import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  cards: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cards = [{
    id: 1,
    name: 'n-Propyl chloride',
    points: 1,
    reagent1: '1o Alkyl halide',
    reagent2: 'Electrophile',
    notes: 'Electrophile for SN2 reactions.',
    image: 'assets/img/cards/large/card1.png'
  },{
    id: 2,
    name: '2-Chloro-2-methylpropane',
    points: 1,
    reagent1: '3o Alkyl halide',
    reagent2: 'Electrophile',
    notes: 'Electrophile for SN1, E1, and E2 reactions.',
    image: 'assets/img/cards/large/card1.png'
  }];
    
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
