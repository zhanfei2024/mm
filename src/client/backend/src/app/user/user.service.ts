import {Injectable} from "@angular/core";
import {HttpService, IMeta} from "../../common/http/http.service";
import {Observable} from "rxjs";
import {URLSearchParams, Http} from "@angular/http";
import * as moment from "moment";
import * as _ from "lodash";

export interface IUser {
  id?: number,
  createdBy?: number,
  updatedBy?: number,
  createdAt?: string,
  updatedAt?: string,
}

export class User {
  id: number;
  name: string;
  description: string;
  startedDate: string;
  endedDate: string;
  remark: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(item?: IUser) {
    if (item) {
      this.id = item.id;
      this.createdBy = item.createdBy;
      this.updatedBy = item.updatedBy;
      this.createdAt = item.createdAt;
      this.updatedAt = item.updatedAt;

    }
  }

  beforeSubmit() {

  }
}

interface IGetUser {
  status: boolean,
  meta: IMeta,
  result: User[]
}

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {

  }

  get(data: any = {}): Observable<IGetUser> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users`, options)
      .map(res => res.json())
      .map(res => {
        res.result = res.result.map((item) => new User(item));
        return res;
      });
  }

  find(id: string, data: any = {}): Observable<User> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };

    return this.httpService
      .get(`user/users/${id}`, options)
      .map(res => res.json().result)
      .map(res => new User(res));
  }

  delete(id: number): Observable<User> {
    return this.httpService
      .delete('user/users/' + id + '?appId=' + '1')
      .map(res => res.json().result)
      .map(res => new User(res));
  }

  store(data: any = {}): Observable<User> {
    return this.httpService
      .post('user/users', data)
      .map(res => res.json().result)
      .map(res => new User(res));
  }

  update(data: any = {}): Observable<User> {
    return this.httpService
      .put('user/users/' + data['id'], data)
      .map(res => res.json().result)
      .map(res => new User(res));
  }



}
