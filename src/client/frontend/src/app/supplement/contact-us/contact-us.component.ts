import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);

  }

}
