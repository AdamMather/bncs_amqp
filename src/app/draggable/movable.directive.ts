import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Global } from './../core/global';
import { Node } from '../core/node.model';
import { NodeSize } from '../core/nodeSize.model';
import { NodeCentrePosition } from '../core/nodeCentrePosition.model';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostBinding('class.movable') movable = true;

  position: Position = { x: 0, y: 0 };

  private startPosition: Position;

  @Input('isMovable') isMovable = true;
  @Input('MovableReset') reset = false;


  private nodeId: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    private global: Global,
    public element: ElementRef
  ) {
    super();
  }

  @HostListener('dragStart', ['$event'])
  onDragStart(event: PointerEvent) {
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    }

    // if (!this.isMovable) {
    //   this.position = { x: 0, y: 0 };
    // }
  }

  @HostListener('dragMove', ['$event'])
  onDragMove(event: PointerEvent) {

    if (this.isMovable) {
      this.position.x = event.clientX - this.startPosition.x;
      this.position.y = event.clientY - this.startPosition.y;
    }
  }

  private centrePoint = function (axis: boolean, x: number, y: number, z: number): NodeCentrePosition {

    //axis is passed in to dermine when the attributes flip between ttop bottom and left right

    let point = new NodeCentrePosition({});

    let cp: number = (y - x) / 2;

    if (axis) {
      point.x = x + cp;
      point.y = z;
    } else {
      point.x = z;
      point.y = x + cp;
    }

    return point;

  }

  @HostListener('dragEnd', ['$event'])
  onDragEnd(event: PointerEvent) {

    if (this.reset) {
      this.position = { x: 0, y: 0 };
    }
  }

  @HostListener('click', ['$event'])
  getCoordinates(ev) {

    // get perimeter values of node
    let viewRect: ClientRect = this.element.nativeElement.getBoundingClientRect();

    let nodeName = ev.srcElement.id;

    if (this.global.arrNodeObjectId.find(
      function (element: any): boolean {
        return element == nodeName
      })) {
      console.log('\n\nupdate - map here\n\n');

      this.global.arrNode.map(node => {
        //record node x y co-ordinates
        node.size.top = viewRect.top;
        node.size.left = viewRect.left;
        node.size.bottom = viewRect.bottom;
        node.size.right = viewRect.right;
        // record centre points
        node.topCentre = this.centrePoint(true, viewRect.left, viewRect.right, viewRect.top);
        node.leftCentre = this.centrePoint(false, viewRect.top, viewRect.bottom, viewRect.left);
        node.bottomCentre = this.centrePoint(true, viewRect.left, viewRect.right, viewRect.bottom);
        node.rightCentre = this.centrePoint(false, viewRect.top, viewRect.bottom, viewRect.right);
      })

    } else {
      // create node id
      this.nodeId = nodeName; //Math.random().toString();
      // create new record
      let node = new Node({});
      let size = new NodeSize({});
      //record node x y co-ordinates
      size.top = viewRect.top;
      size.left = viewRect.left;
      size.bottom = viewRect.bottom;
      size.right = viewRect.right;

      node._id = ev.srcElement.id;
      node.size = size;
      // record centre points
      node.topCentre = this.centrePoint(true, viewRect.left, viewRect.right, viewRect.top);
      node.leftCentre = this.centrePoint(false, viewRect.top, viewRect.bottom, viewRect.left);
      node.bottomCentre = this.centrePoint(true, viewRect.left, viewRect.right, viewRect.bottom);
      node.rightCentre = this.centrePoint(false, viewRect.top, viewRect.bottom, viewRect.right);

      //
      this.global.arrNode.push(node);

      // record node id in array for future use
      this.global.arrNodeObjectId.push(this.nodeId);
    }

    //console.log('node id array\n' + this.global.arrNodeObjectId.length.toString());
    console.log(this.global.arrNode);

    //console.log(this.centrePoint(false, viewRect.top, viewRect.bottom, viewRect.right));
    //console.log('Element top: ' + viewRect.top + '\nElement left: ' + viewRect.left + '\nElement bottom: ' + viewRect.bottom + '\nElement right: ' + viewRect.right + '\n\ncenterEdgeX: ' + this.global.centreEdgeX + '\ncenterEdgeY: ' + this.global.centreEdgeY);
  }
}
