import { NodeConnector } from './nodeConnector.model';

export class NodeRelationships {

     public _id: string;
     topCentre: NodeConnector;
     leftCentre: NodeConnector;
     bottomCentre: NodeConnector;
     rightCentre: NodeConnector;

     constructor(input: Object) {
         this._id = input['_id'];
         // array of relationships (1toMany)
         // need to record node side of which line is attached

     }
 }