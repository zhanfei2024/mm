import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './chamber-settled.component.html',
})
export class ChamberSettledComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
