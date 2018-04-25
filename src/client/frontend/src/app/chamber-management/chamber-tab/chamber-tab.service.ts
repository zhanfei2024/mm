import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpService} from '../../../common/http/http.service';


export interface Itab {
  title?: string,
  content?: string
}
export class Tab {
  "title": string;
  "content": string;
}
@Injectable()
export class ChamberTabService {

  constructor(private httpService: HttpService) { }

  get(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/tabs`, options)
      .map(res => res.json())
  }

  getFind(id: string, postId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/tabs/${postId}`, options)
      .map(res => res.json())
  }

  store(id: string, data: any): Observable<any> {
    return this.httpService
      .post(`enterprise/enterprises/cocs/${id}/tabs`, data)
      .map(res => res.json().result)
  }


  update(id: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/tabs/${data['id']}`, data)
      .map(res => res.json().result)
  }

  delete(id: string, postId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/tabs/${postId}`)
      .map(res => res.json().result);
  }

}
