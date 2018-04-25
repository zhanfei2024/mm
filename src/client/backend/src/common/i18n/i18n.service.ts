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

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en-us');
    // the lang to use, if the lang isn't available, it will use the current loader to get them

    translate.use('en-us');

  }

  setLanguage(lang: string) {
    if (_.indexOf(['en-us', 'zh-hk', 'zh-cn'], lang) !== -1) {
      this.translate.use(lang);
      this.language = lang;
      this.languageSource.next(lang)
    } else {
      this.translate.use('en-us');
      this.language = 'en-us';

      this.languageSource.next('en-us')
    }
  }

  instant(string) {
    return this.translate.instant(string);
  }
}
