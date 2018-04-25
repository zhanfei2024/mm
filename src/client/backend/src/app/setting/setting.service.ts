import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

export interface ISetting {
  id?: string,
  name?: string,
  title?: string,
  description?: string,
  keywords?: string,
  footer?: string,
  statisticsCode?: string,
}

export class Setting {
  title?: string;
  name?: string;
  id?: string;
  description?: string;
  keywords?: string;
  footer?: string;
  statisticsCode?: string;

  constructor(item?: ISetting) {
    if (item) {
      this.title = item.title;
      this.name = item.name;
      this.id = item.id;
      this.description = item.description;
      this.keywords = item.keywords;
      this.footer = item.footer;
      this.statisticsCode = item.statisticsCode;
    }
  }
}

@Injectable()
export class SettingService {

  constructor(private httpService: HttpService) {
  }

  get(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/setting`, options)
      .map(res => res.json())
  }

  store(data: any): Observable<any> {
    return this.httpService
      .put('admin/setting', data)
      .map(res => res.json().result)
  }


}
