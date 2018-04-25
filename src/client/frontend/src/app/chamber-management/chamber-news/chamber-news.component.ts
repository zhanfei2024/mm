import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './chamber-news.component.html',
})
export class ChamberNewsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
