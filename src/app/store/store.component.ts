import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser'
import { AsyncPipe } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as d3 from 'd3';

import { Router, ActivatedRoute } from '@angular/router';
import { Global } from './../core/global';
import { NodeCentrePosition } from '../core/nodeCentrePosition.model';

import { Panel } from '../core/panel.model';
import { Card } from '../core/card.model';

export type DataType = { x: number, y: number };

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})

export class StoreComponent implements OnInit {

  public panels: Array<Panel>;
  public cards = new Array<Card>();
  private lineData = [{ "x": 1, "y": 5 }, { "x": 20, "y": 20 }];

  @ViewChild('bncs') canvas: any;

  private objCoords: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private global: Global,
    public renderer: Renderer
  ) { }

  ngOnInit(): void {

    this.global.path = this.router.url;
    this.panels = this.route.snapshot.data['portal'];
    // *** check data is coming back
    // console.log(this.panels);

  }

  private draw2dCanvas(eleId: string): CanvasRenderingContext2D {
    this.canvas = <HTMLCanvasElement>document.getElementById(eleId);
    return this.canvas.getContext('2d');
  }

  public drawD3Line() {

    //This is the accessor function we talked about above
    let lineFunction = d3.line<DataType>()
      .x((d) => { return d.x; })
      .y((d) => { return d.y; })
      .curve(d3.curveLinear);

    //The SVG Container
    let svgContainer = d3.select("#draw > svg");
    if (svgContainer.empty()) {
      svgContainer = d3.select("#draw").append("svg")
        .attr("width", 900)
        .attr("height", 600);
    }

    //The line SVG Path we draw
    let lineGraph = svgContainer.append("path")
      .attr("d", lineFunction(this.lineData))
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    return lineGraph;
  }

  public getCordinates(ev) {
    // get co-ordinates - mousemove event on goodCanvas1
    let currentX = ev.clientX;
    let currentY = ev.clientY;

    //console.log('X: ' + currentX + '\nY: ' + currentY);

  }

  public svg_coords(ev, flag) {
    let coordX: number = ev.pageX;
    let coordY: number = ev.pageY;

    if (flag) {
      // beginning of line
      this.objCoords.startX = coordX;
      this.objCoords.startY = coordY;
    } else {
      // end of line
      this.objCoords.endX = coordX;
      this.objCoords.endY = coordY;
    }

    if (this.objCoords.startX != null && this.objCoords.startY != null && this.objCoords.endX != null && this.objCoords.endY != null) {

      this.lineData = [{ x: this.objCoords.startX, y: this.objCoords.startY }, { x: this.objCoords.endX, y: this.objCoords.endY }];

      this.drawD3Line();

    }
  }

  public coordinates(ev, flag) {

    let coordX: number = ev.pageX;
    let coordY: number = ev.pageY;

    if (flag) {
      // beginning of line
      this.objCoords.startX = coordX;
      this.objCoords.startY = coordY;
    } else {
      // end of line
      this.objCoords.endX = coordX;
      this.objCoords.endY = coordY;
    }

    if (this.objCoords.startX != null && this.objCoords.startY != null && this.objCoords.endX != null && this.objCoords.endY != null) {

      // *** snap to nearest centrepoint
      let arrCentrePoints: Array<NodeCentrePosition> = [];

      // get perimeter centre points of node
      this.global.arrNode.map(node => {
        arrCentrePoints.push(node.topCentre);
        arrCentrePoints.push(node.leftCentre);
        arrCentrePoints.push(node.bottomCentre);
        arrCentrePoints.push(node.rightCentre);
      })

      this.getCentrePoint(arrCentrePoints);

      // draw line
      this.lineData = [{ x: this.objCoords.startX, y: this.objCoords.startY }, { x: this.objCoords.endX, y: this.objCoords.endY }];

      this.drawD3Line();


      //this.drawLine(this.objCoords);
      //this.objCoords = {};
    }
  }

  private getCentrePoint(arr: Array<any>) {
    // loop through arrCentrePoint and compare each nodeCentrePosition pair with currentStart pair
    let arrStartX: Array<any> = [];
    let arrStartY: Array<any> = [];

    let arrEndX: Array<any> = [];
    let arrEndY: Array<any> = [];

    arr.map(cp => {
      // accumulate x,y co-ords
      arrStartX.push({
        pos: cp.x, diff: Math.abs(this.objCoords.startX - cp.x)
      });
      arrStartY.push({
        pos: cp.y, diff: Math.abs(this.objCoords.startY - cp.y)
      });

      arrEndX.push({
        pos: cp.x, diff: Math.abs(this.objCoords.endX - cp.x)
      });
      arrEndY.push({
        pos: cp.y, diff: Math.abs(this.objCoords.endY - cp.y)
      });

    })

    let startX = arrStartX.sort(function (a, b) { return a.diff - b.diff; })[0];
    let startY = arrStartY.sort(function (a, b) { return a.diff - b.diff; })[0];

    let endX = arrEndX.sort(function (a, b) { return a.diff - b.diff; })[0];
    let endY = arrEndY.sort(function (a, b) { return a.diff - b.diff; })[0];

    // un/comment to un/snapb connectors to nodes
    if (startX && startY && endX && endY) {

      this.objCoords.startX = startX.pos;
      this.objCoords.startY = startY.pos;

      this.objCoords.endX = endX.pos;
      this.objCoords.endY = endY.pos;
    }
    // end

  }

  add(index: number): void {

    this.panels[index].cards.push(new Card({ name: "new card", status: "#00ff00" }));

  }

  createPanelId(itemId: string): string {

    return "panel-" + itemId;
  }

  createCardId(itemId: string): string {

    return "card-" + itemId;
  }

  identifyElement(ev): void {
    this.global.accessKey = ev.srcElement.accessKey;
    console.log('you have clicked on ' + this.global.accessKey);
  }

  movePanel(): boolean {

    return this.global.accessKey == 'panel' ? true : false;

  }

  moveCard(): boolean {

    return this.global.accessKey == 'card' ? true : false;

  }

  setStyle(value: string): SafeStyle {

    return this.sanitizer.bypassSecurityTrustStyle('background: ' + value);
  }

}
