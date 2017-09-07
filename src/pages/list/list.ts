import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Card } from '../../models/card';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  cards: Card[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cardServiceProvider: CardServiceProvider) {
    this.cards = cardServiceProvider.getCards();
    
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

  /**
   * Navigate to the detail page for this item.
   */
  openItem(card: Card) {
    this.navCtrl.push(DetailPage, {
      card: card
    });
  }

}
