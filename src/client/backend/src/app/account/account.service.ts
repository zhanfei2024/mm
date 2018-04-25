import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

@Injectable()
export class AccountService {

  constructor(private httpService: HttpService) {
  }

  getAllOrders(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/admins/self`, options)
      .map(res => res.json())
  }

  update(data: any = {}): Observable<any> {

    return this.httpService
      .post(`admin/auth/change-password`, data)
      .map(res => res.json())
  }

}
