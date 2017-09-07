import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Card } from '../../models/card';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: Card;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('card');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
