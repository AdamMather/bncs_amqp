export class NodeSize {

     public top: number;
     public left: number;
     public bottom: number;
     public right: number;

     constructor(input: Object) {
         this.top = input['top'];
         this.left = input['left'];
         this.bottom = input['bottom'];
         this.right = input['right'];
     }
 }