import {Injectable} from "@angular/core";
import {TranslateService} from '@ngx-translate/core';
import * as _ from "lodash";
import {Subject} from "rxjs/Subject";

@Injectable()
export class I18nService {
  languageSource = new Subject<string>();
  language$ = this.languageSource.asObservable();
  language = 'en';

  constructor(public translate: TranslateService) {
    if (_.isNil(localStorage.getItem('lang'))) {
      localStorage.setItem('lang', 'hk');
      translate.setDefaultLang('hk');
      translate.use('hk');
    } else {
      translate.setDefaultLang('hk');
      translate.use('hk');
    }
  }

  setLanguage(lang: string) {
    if (_.indexOf(['en', 'hk', 'cn'], lang) !== -1) {
      this.translate.use(lang);
      this.language = lang;
      this.languageSource.next(lang)
    } else {
      this.translate.use('en');
      this.language = 'en';

      this.languageSource.next('en')
    }
  }

  instant(string) {
    return this.translate.instant(string);
  }
}
