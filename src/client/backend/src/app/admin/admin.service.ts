import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';


export interface Admin {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  remark?: string;
}

export class Admin {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  remark?: string;

  constructor(item?: Admin) {
    if (item) {
      this.id = item.id;
      this.name = item.name;
      this.email = item.email;
      this.password = item.password;
      this.remark = item.remark;

    }
  }
}


@Injectable()
export class AdminService {

  constructor(private httpService: HttpService) {
  }

  getAllOrders(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/admins`, options)
      .map(res => res.json())
  }

  onSubmit(data: any = {}): Observable<any> {
    return this.httpService.post(`admin/admins`, data)
      .map(res => res.json)
  }
  delete(data: any = {}): Observable<any> {
    return this.httpService.delete(`admin/admins/${data.id}`, data).map(res => res.json)
  }

  onUpdate(data: any = {}): Observable<any> {
    return this.httpService.put(`admin/admins/${data.id}`, data).map(res => res.json)
  }


}
