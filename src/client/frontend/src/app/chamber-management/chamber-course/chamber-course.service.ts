import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../common/http/http.service";


export interface ICourse {
  url?: string,
  title?: string,
  order?: string,
}

export class Course {
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
export class CourseService {

  constructor(private httpService: HttpService) {
  }

  get(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/slide-show`, options)
      .map(res => res.json())
  }

  getFind(id: string, slideShowId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/slide-show/${slideShowId}`, options)
      .map(res => res.json())
  }

  store(id: string, data: any): Observable<any> {
    return this.httpService
      .post(`enterprise/enterprises/cocs/${id}/slide-show`, data)
      .map(res => res.json().result)
  }


  update(id: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/slide-show/${data['id']}`, data)
      .map(res => res.json().result)
  }

  delete(id: string, slideShowId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/slide-show/${slideShowId}`)
      .map(res => res.json().result);
  }
}
