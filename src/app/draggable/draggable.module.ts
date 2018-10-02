import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { DraggableRxDirective } from './draggable-rx.directive';
import { MovableDirective } from './movable.directive';
import { MovableAreaDirective } from './movable-area.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, DraggableRxDirective, MovableDirective, MovableAreaDirective],
  exports: [DraggableDirective, DraggableRxDirective, MovableDirective, MovableAreaDirective]
})
export class DraggableModule { }
