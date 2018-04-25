import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('en-us');
    // the lang to use, if the lang isn't available, it will use the current loader to get them

    this.translateService.use('en-us');
  }

}
