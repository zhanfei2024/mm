import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

@Injectable()
export class SlideService {

  constructor(private httpService: HttpService) {
  }

  getAllOrders(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/slide-show`, options)
      .map(res => res.json())
  }

  delete(data: any = {}): Observable<any> {

    return this.httpService
      .delete(`admin/slide-show/${data}`, data)
      .map(res => res.json())
  }


}
