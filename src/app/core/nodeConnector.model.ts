export class NodeConnector {

     public _id: string;
     public StartX: number;
     public StartY: number;
     public EndX: number;
     public EndY: number;


     constructor(input: Object) {
         this._id = input['_id'];
         this.StartX = input['StartX'];
         this.StartY = input['StartY'];
         this.EndX = input['EndX'];
         this.EndY = input['EndY'];

     }
 }