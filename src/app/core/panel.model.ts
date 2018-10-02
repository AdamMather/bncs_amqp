import { Card } from './card.model';


export class Panel {

     public _id: string;
     public name: string;
     public cards: Card[];

     constructor(input: Object) {
         this._id = input['_id'];
         this.name = input['name'];
         this.cards  = (input['cards']) ? (input['cards'] as Object[]).map(record => new Card(record)) : [];

     }
 }