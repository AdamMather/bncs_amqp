import { Component, OnInit } from '@angular/core';
import { Global } from './../../core/global';

import { Search } from './../../core/search.model';

@Component({
  selector: 'app-base-nav',
  templateUrl: './base-nav.component.html',
  styleUrls: ['./base-nav.component.scss']
})
export class BaseNavComponent implements OnInit {

  public search: Search;

  constructor(private global: Global) { }

  ngOnInit() {

    this.search = new Search({});

  }

}
