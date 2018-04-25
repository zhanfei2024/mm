import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

@Injectable()
export class RuleService {

  constructor(private httpService: HttpService) {
  }

  getAllOrders(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/rules`, options)
      .map(res => res.json())
  }

  delete(data: any = {}): Observable<any> {
    return this.httpService
      .delete(`admin/rules/${data.id}/coc/${data.cocId}`)
      .map(res => res.json().result)
  }


}
