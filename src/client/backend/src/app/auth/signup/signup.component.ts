import {Component, OnInit} from '@angular/core';
import {Auth} from '../auth.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';
import {Router} from "@angular/router";
import * as _ from 'lodash';
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  signupLoading = false;
  language: string;
  languageId: number;

  constructor(private auth: Auth,
              private toasterService: ToasterService,
              private translate: TranslateService,
              private router: Router) {
  }


  ngOnInit() {
    this.language = !_.isNull(localStorage.getItem('language')) ? localStorage.getItem('language') : 'en-us';
    this.setLanguage(this.language);
  }

  async signup() {
    this.signupLoading = true;
    try {
      await this.auth.signUp(this.email, this.password, this.languageId).toPromise();
      await this.auth.login(this.email, this.password).toPromise();
      this.router.navigate(['/']);
      this.signupLoading = false;
    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
      this.signupLoading = false;
    }
  }

  setLanguage(lang: string): void{
    this.languageId = this.getLanguageId(lang);
    this.language = lang;
    this.translate.use(lang);
  }

  getLanguageId(str: string): number{
    let id: number;
    if(str === 'en-us') id = 1;
    if(str === 'zh-hk') id = 2;
    if(str === 'zh-cn') id = 3;
    return id;
  }

}
