import { Injectable } from '@angular/core';
import { Node } from './node.model';
import { NodeSize } from './nodeSize.model';

@Injectable()
export class Global {

    public path: string;
    public accessKey: string;

    public arrNodeSize: Array<NodeSize> = [];
    public arrNodeObjectId: Array<string> = [];

    public arrNode: Array<Node> = [];
    
}