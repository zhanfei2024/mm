import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

@Injectable()
export class EnterpriseService {

  constructor(private httpService: HttpService) {
  }

  getAllOrders(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/cocs`, options)
      .map(res => res.json())
  }

  find(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/cocs/${id}`, options)
      .map(res => res.json().result)
  }

  delete(data: any = {}): Observable<any> {
    return this.httpService
      .delete(`admin/cocs/${data.id}`)
      .map(res => res.json().result)
  }

  update(data: any): Observable<any> {
    return this.httpService
      .put(`admin/cocs/${data['id']}`, data)
      .map(res => res.json().result)
  }

}
