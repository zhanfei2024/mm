import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: './chamber-settled-success.component.html',
})

export class ChamberSettledSuccessComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/chamber', 'select']);
    }, 2000);
  }
}
