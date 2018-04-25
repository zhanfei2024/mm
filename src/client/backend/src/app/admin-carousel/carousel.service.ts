import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

export interface ICourse {
  url?: string,
  title?: string,
  order?: string,
}

export class Courses {
  title?: string;
  url?: string;
  order?: string;

  constructor(item?: ICourse) {
    if (item) {
      this.url = item.url;
      this.title = item.title;
      this.order = item.order;
    }
  }
}

@Injectable()
export class CarouselService {

  constructor(private httpService: HttpService) {
  }

  get(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/slide-show`, options)
      .map(res => res.json())
  }

  find(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/slide-show/${id}`, options)
      .map(res => res.json().result)
  }

  store(data: any): Observable<any> {
    delete data.cocId;
    delete data.enterpriseId;
    return this.httpService
      .post('admin/slide-show', data)
      .map(res => res.json().result)
  }

  update(data: any): Observable<any> {
    data.type = 'platform';
    delete data.cocId;
    delete data.enterpriseId;
    return this.httpService
      .put(`admin/slide-show/${data['id']}`, data)
      .map(res => res.json().result)
  }

  delete(id: string): Observable<boolean> {
    return this.httpService
      .delete(`admin/slide-show/${id}`)
      .map(res => res.json().result);
  }

}
