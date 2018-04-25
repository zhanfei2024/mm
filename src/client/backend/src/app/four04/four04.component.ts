import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './four04.component.html'
})

export class Four04Component implements OnInit {
  public lang: string;
  constructor(private translate: TranslateService) {
  }
  ngOnInit(): void {
    this.lang = localStorage.getItem('language') ? localStorage.getItem('language') : 'en-us';
    this.translate.use(this.lang);
  }

}
