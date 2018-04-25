import {Injectable} from '@angular/core';
import {HttpService} from '../../common/http/http.service';
import {Auth} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {URLSearchParams} from '@angular/http';



@Injectable()
export class DashboardService {
  constructor(private httpService: HttpService) {
  }

  get(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/statistics`, options)
      .map(res => res.json().result);
  }
}
