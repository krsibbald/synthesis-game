import { Injectable } from '@angular/core';
import { ALLCARDS } from '../../assets/data/cards';
import { CardModel } from '../../models/card-model';

@Injectable()
export class CardServiceProvider {
  cards: CardModel[];

  constructor() {
    this.cards = ALLCARDS;
  }


  getCards(){
    return this.cards;
  }

}
