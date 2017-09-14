import { Card} from './card';

export class Player{
  id: number;
  name: string;
  deck: Card[] = [];
  hand: Card[] = [];
  recycle: Card[] = [];
  lab: Card[] = [];
  totalPoints: number = 0;
  spendingPoints: number = 0;
};