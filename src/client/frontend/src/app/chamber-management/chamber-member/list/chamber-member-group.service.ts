import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../../common/http/http.service";


export interface IGroup {
  id?: string,
  name?: string,
  order?: string,
  balance?: string,
  timeSpan?: boolean,
}

export class Group {
  id?: string;
  name?: string;
  order?: string;
  balance?: string;
  timeSpan?: boolean;


  constructor(item?: IGroup) {
    if (item) {
      this.id = item.id;
      this.name = item.name;
      this.balance = item.balance;
      this.timeSpan = item.timeSpan;
    }
  }
}


@Injectable()
export class ChamberMemberGroupService {

  constructor(private httpService: HttpService) {
  }

  get(item: string, id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/${item}`, options)
      .map(res => res.json())
  }

  getFind(id: string, postId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/groups/${postId}`, options)
      .map(res => res.json())
  }

  store(id: string, data: any): Observable<any> {
    return this.httpService
      .post(`enterprise/enterprises/cocs/${id}/groups`, data)
      .map(res => res.json().result)
  }


  update(id: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/groups/${data['id']}`, data)
      .map(res => res.json().result)
  }

  delete(id: string, postId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/groups/${postId}`)
      .map(res => res.json().result);
  }
}
