import { NodeSize } from './nodeSize.model';
import { NodeRelationships } from './nodeRelationships.model';
import { NodeCentrePosition } from './nodeCentrePosition.model';

export class Node {

     public _id: string;
     public size: NodeSize
     public relationships: NodeRelationships;
     public topCentre: NodeCentrePosition;
     public leftCentre: NodeCentrePosition;
     public bottomCentre: NodeCentrePosition;
     public rightCentre: NodeCentrePosition;

     constructor(input: Object) {
         this._id = input['_id'];
         this.size = input['addrLine1'];
         this.relationships = input['addrLine3'];
         this.topCentre = input['topCentre'];
         this.leftCentre = input['leftCentre'];
         this.bottomCentre = input['bottomCentre'];
         this.rightCentre = input['rightCentre'];
     }
 }