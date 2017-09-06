import { CardModel } from '../../models/card-model';

export const ALLCARDS: CardModel[] =
[{
    id: 1,
    name: 'n-Propyl chloride',
    points: 1,
    reagent1: '1o Alkyl halide',
    reagent2: 'Electrophile',
    notes: 'Electrophile for SN2 reactions.',
    image: 'assets/img/cards/large/card01.png',
    startHandNum: 3,
    stockroomNum: 0
  },{
    id: 2,
    name: '2-Chloro-2-methylpropane',
    points: 1,
    reagent1: '3o Alkyl halide',
    reagent2: 'Electrophile',
    notes: 'Electrophile for SN1, E1, and E2 reactions.',
    image: 'assets/img/cards/large/card02.png',
    startHandNum: 3,
    stockroomNum: 0
  },{
    id: 3,
    name: 'Hydroxide',
    points: 1,
    reagent1: 'Strong Base',
    reagent2: 'Strong Nucleophile',
    notes: 'Nucleophile/base for SN2 and E2 reactions.',
    image: 'assets/img/cards/large/card03.png',
    startHandNum: 4,
    stockroomNum: 0
  },{
    id: 4,
    name: 'Chlorine',
    points: 2,
    reagent1: 'Oxidant',
    reagent2: '',
    notes: 'Strong oxidant capable of reacting with alkenes and under radical conditions.',
    image: 'assets/img/cards/large/card04.png',
    startHandNum: 0,
    stockroomNum: 3
  },{
    id: 5,
    name: 'Hydrochloric Acid',
    points: 1,
    reagent1: 'Strong Acid',
    reagent2: '',
    notes: 'Strong acid useful for protonation of many weakly basic molecules. Chloride ion produced after deprotonation.',
    image: 'assets/img/cards/large/card05.png',
    startHandNum: 0,
    stockroomNum: 3
  },{
    id: 6,
    name: '1-Butene',
    points: 1,
    reagent1: 'Alkene',
    reagent2: '',
    notes: 'Alkene useful for addition reactions.',
    image: 'assets/img/cards/large/card06.png',
    startHandNum: 0,
    stockroomNum: 3
  },{
    id: 7,
    name: 'Light',
    points: 3,
    reagent1: 'Catalyst',
    reagent2: '',
    notes: 'Catalyst for initiating photochemical reactions.',
    image: 'assets/img/cards/large/card07.png',
    startHandNum: 0,
    stockroomNum: 3
  },{
    id: 8,
    name: 'Magnesium metal',
    points: 5,
    reagent1: 'Metal',
    reagent2: '',
    notes: 'Reacts with alkyl halides to form Grignard reagents.',
    image: 'assets/img/cards/large/card08.png',
    startHandNum: 0,
    stockroomNum: 3
  },{
    id: 9,
    name: 'Thionyl chloride',
    points: 3,
    reagent1: 'Chlorinating Reagent',
    reagent2: '',
    notes: 'Converts alcohols into alkyl chlorides.',
    image: 'assets/img/cards/large/card09.png',
    startHandNum: 0,
    stockroomNum: 3
  },{
    id: 10,
    name: 'Sodium Hypochlorite',
    points: 3,
    reagent1: 'Oxidant',
    reagent2: '',
    notes: 'Converts alcohols into carbonyls.',
    image: 'assets/img/cards/large/card10.png',
    startHandNum: 0,
    stockroomNum: 2
  },{
    id: 11,
    name: 'Swern Conditions',
    points: 3,
    reagent1: 'Oxidant',
    reagent2: '',
    notes: 'Converts alcohols into carbonyls.',
    image: 'assets/img/cards/large/card11.png',
    startHandNum: 0,
    stockroomNum: 2
  },{
    id: 12,
    name: 'Sodium Hydride',
    points: 2,
    reagent1: 'Strong Base',
    reagent2: '',
    notes: 'A strong base without a significant reverse reaction.',image: 'assets/img/cards/large/card12.png',
    startHandNum: 0,
    stockroomNum: 3
  },{
    id: 13,
    name: 'Sodium cyanide',
    points: 2,
    reagent1: 'Weak Base',
    reagent2: 'Strong Nucleophile',
    notes: 'An unhindered nucleophile especially suited for SN2 reactions.',
    image: 'assets/img/cards/large/card13.png',
    startHandNum: 0,
    stockroomNum: 2
  },{
    id: 14,
    name: 'n-Propylamine',
    points: 1,
    reagent1: 'Weak Base',
    reagent2: 'Weak Nucleophile',
    notes: 'Nucleophile/base for SN1 and E1 reactions.',
    image: 'assets/img/cards/large/card14.png',
    startHandNum: 0,
    stockroomNum: 0
  },{
    id: 15,
    name: '4-Penten-1-ol',
    points: 5,
    reagent1: 'Alcohols',
    reagent2: 'Alkene',
    notes: 'Contains both a primary alcohol and alkene.',
    image: 'assets/img/cards/large/card15.png',
    startHandNum: 0,
    stockroomNum: 2
  },{
    id: 16,
    name: 'Lithium Aluminum Hydride',
    points: 3,
    reagent1: 'Reducing Agent',
    reagent2: '',
    notes: 'A strong reducing agent commonly used with carbonyls.',
    image: 'assets/img/cards/large/card16.png',
    startHandNum: 0,
    stockroomNum: 3
  },{
    id: 17,
    name: 'Hydronium Ion',
    points: 1,
    reagent1: 'Weak Acid',
    reagent2: '',
    notes: 'Weak acid useful for protonation of basic molecules.',
    image: 'assets/img/cards/large/card17.png',
    startHandNum: 0,
    stockroomNum: 3
   },{
    id: 18,
    name: 'Ammonia',
    points: 1,
    reagent1: 'Weak Base',
    reagent2: 'Weak Nucleophile',
    notes: 'Nucleophile/base for SN1 and E1 reactions.',
    image: 'assets/img/cards/large/card18.png',
    startHandNum: 0,
    stockroomNum: 3
   },{
    id: 19,
    name: '1,3-Butadiene',
    points: 4,
    reagent1: 'Alkene',
    reagent2: '',
    notes: 'A conjugated diene.',
    image: 'assets/img/cards/large/card19.png',
    startHandNum: 0,
    stockroomNum: 2
  },{
    id: 20,
    name: 'Acrolein',
    points: 5,
    reagent1: 'Carbonyl',
    reagent2: 'Alkene',
    notes: 'A good Michael acceptor and Diels-Alder reagent.',
    image: 'assets/img/cards/large/card20.png',
    startHandNum: 0,
    stockroomNum: 0
  },{
    id: 21,
    name: 'Cyclopentadiene',
    points: 4,
    reagent1: 'Alkene',
    reagent2: '',
    notes: 'A cyclic conjugated diene.',
    image: 'assets/img/cards/large/card21.png',
    startHandNum: 0,
    stockroomNum: 2
  },{
    id: 22,
    name: 'Dimethyl maleate',
    points: 5,
    reagent1: 'Alkene',
    reagent2: 'Carbonyl',
    notes: 'A electron-deficient alkene.',
    image: 'assets/img/cards/large/card22.png',
    startHandNum: 0,
    stockroomNum: 2
  },{
    id: 23,
    name: '2-Chloropropane',
    points: 2,
    reagent1: '2o Alkyl halide',
    reagent2: 'Electrophile',
    notes: 'Electrophile for SN1, SN2, E1, and E2 reactions.',
    image: 'assets/img/cards/large/card23.png',
    startHandNum: 0,
    stockroomNum: 3
  },{
    id: 24,
    name: 'Ozone',
    points: 3,
    reagent1: 'Oxidant',
    reagent2: '',
    notes: 'A powerful oxidant capable of cleaving alkenes and alkynes.',
    image: 'assets/img/cards/large/card24.png',
    startHandNum: 0,
    stockroomNum: 2
  },{
    id: 25,
    name: 'Lithium diisopropyl amine.',
    points: 3,
    reagent1: 'Strong Base',
    reagent2: '',
    notes: 'A strong base useful in E2 and deprotonation reactions.',
    image: 'assets/img/cards/large/card25.png',
    startHandNum: 0,
    stockroomNum: 2

  }];