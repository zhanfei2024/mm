import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

@Injectable()
export class MemberService {

  constructor(private httpService: HttpService) {
  }

  getAllOrders(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/members`, options)
      .map(res => res.json())
  }
  delete(data: any = {}): Observable<any> {
    return this.httpService.delete(`admin/members/${data.id}`).map(res => res.json().result)
  }

  find(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/members/${id}`, options)
      .map(res => res.json().result)
  }

}
