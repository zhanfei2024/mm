import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

export interface AddIink {
  id?: string,
  title?: string,
  linkUrl?: string,
  order?: number,
  phone?: string,
  contacts?: string,
  isActive?: string,
}

export class IAddIink {
  id?: string;
  linkUrl?: string;
  title?: string;
  order?: number;
  contacts?: string;
  phone?: string;
  isActive?: string;


  constructor(item?: AddIink) {
    if (item) {
      this.id = item.id;
      this.title = item.title;
      this.order = item.order;
      this.linkUrl = item.linkUrl;
      this.contacts = item.contacts;
      this.phone = item.phone;
      this.isActive = item.isActive;

    }
  }
}

@Injectable()
export class LinkService {

  constructor(private httpService: HttpService) {
  }

  get(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/links`, options)
      .map(res => res.json())
  }

  find(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/links/${id}`, options)
      .map(res => res.json().result)
  }

  store(data: any): Observable<any> {
    return this.httpService
      .post('admin/links', data)
      .map(res => res.json().result)
  }

  update(data: any): Observable<any> {
    return this.httpService
      .put(`admin/links/${data['id']}`, data)
      .map(res => res.json().result)
  }

  delete(id: string): Observable<boolean> {
    return this.httpService
      .delete(`admin/links/${id}`)
      .map(res => res.json().result);
  }

}
