import {Component, OnInit} from '@angular/core';
import {Auth} from '../auth.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loginLoading = false;
  language: string;
  languageId = 1;

  constructor(private auth: Auth,
              private toasterService: ToasterService,
              private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.language = !_.isNull(localStorage.getItem('language')) ? localStorage.getItem('language') : 'en-us';
    this.setLanguage(this.language);
  }


  goForgetPassword() {
    this.router.navigate(['/auth/forgetPassword']);
  }

  async login() {
    this.loginLoading = true;
    try {
      await this.auth.login(this.email, this.password).toPromise();
      this.router.navigate(['/']);
      this.loginLoading = false;
    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
      this.loginLoading = false;
      err.code === 11004 ? this.router.navigate(['/auth/signup']) : this.router.navigate(['/auth/login']);
    }
  }

  setLanguage(lang: string): void {
    this.languageId = this.getLanguageId(lang);
    this.language = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  getLanguageId(str: string): number {
    // let id: number;
    // if (str === 'en-us') {id = 1}
    // if (str === 'zh-hk') {id = 2}
    // if (str === 'zh-cn') {id = 3}
    // return id;
    return (str === 'en-us' ? 1 : (str === 'zh-hk' ? 2 : 3));
  }

}
