import { Card} from './card';

export class Player{
  id: number;
  name: string;
  deck: Card[] = [];
  hand: Card[] = [];
  recycle: Card[] = [];
  lab: Card[] = [];
};