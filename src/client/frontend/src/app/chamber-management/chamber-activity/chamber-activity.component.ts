import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './chamber-activity.component.html',
})
export class ChamberActivityComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
