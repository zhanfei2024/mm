import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {I18nService} from "../i18n/i18n.service";
import * as _ from 'lodash';
import {Observable} from "rxjs/Observable";

@Injectable()
export class GlobalSettingObservableService {

  public logo = new Subject<any>();
  public coc = new Subject<any>();
  public cocs: any[];

  constructor(private i18nService: I18nService) {

  }

  nextImages(data: any[]) {
    this.logo.next(data);
  }

  getImages(): Observable<any> {
    return this.logo.asObservable();
  }

  nextCoc(data: any[]) {
    this.coc.next(data);
    this.cocs = data;
  }

  getCoc(): Observable<any> {
    return this.coc.asObservable();
  }

  set() {
  }

  setLanguage(lang: string) {
    if (!_.includes(['en', 'hk', 'cn'], lang)) {
      lang = 'en';
    }
    localStorage.setItem('lang', lang);
    this.i18nService.setLanguage(lang);
  }
}


@Injectable()
export class SelfObservableService {
  subject = new Subject<any>();
  self$ = this.subject.asObservable();
  self: any = {};

  constructor(private i18nService: I18nService) {

  }

  set(user: any) {
    this.self = user;
    this.i18nService.setLanguage(this.self.setting ? this.self.setting.language : '');
    this.subject.next(this.self);
  }
}
