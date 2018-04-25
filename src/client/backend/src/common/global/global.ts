import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import * as _ from 'lodash';
import {I18nService} from '../i18n/i18n.service';
import {lang} from 'moment';

@Injectable()
export class GlobalSettingObservableService {


  constructor(private i18nService: I18nService) {

  }

  set() {
  }

  setLogo(logo: string) {
  }

  setLanguage(lang: string) {
    if (!_.includes(['en-us', 'zh-hk', 'zh-cn'], lang)) { lang = 'en-hk'; }
    localStorage.setItem('language', lang);
    this.i18nService.setLanguage(lang);
  }
}

@Injectable()
export class SelfObservableService {

  constructor() {
  }

  set() {
  }
}


@Injectable()
export class SelfObservableTeamService {

  constructor() {

  }

  set() {
  }
}

