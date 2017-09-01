import { CardModel } from '../../models/card-model';

export const ALLCARDS: CardModel[] =
[{
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
  },{
    id: 3,
    name: 'Hydroxide',
    points: 1,
    reagent1: 'Strong Base',
    reagent2: 'Strong Nucleophile',
    notes: ' Nucleophile/base for SN2 and E2 reactions.',
    image: 'assets/img/cards/large/card1.png'
  }];