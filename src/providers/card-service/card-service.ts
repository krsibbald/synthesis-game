import { Injectable } from '@angular/core';
import { ALLCARDS } from '../../assets/data/cards';
import { Card } from '../../models/card';

@Injectable()
export class CardServiceProvider {
  cards: Card[];

  constructor() {
    this.cards = ALLCARDS;
  }


  getCards(){
    return this.cards;
  }

}
