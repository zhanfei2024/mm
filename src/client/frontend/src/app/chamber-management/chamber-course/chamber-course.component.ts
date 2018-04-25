import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './chamber-course.component.html',
})
export class ChamberCourseComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
