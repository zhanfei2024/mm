import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../../common/http/http.service";


export interface IMember {
  name?: string,
  type?: string,
  email?: string,
  phone?: boolean,
  cocId?: string,
  introducer?: string,
  number?: number,
  position?: string
}

export class Member {
  name?: string;
  type?: string;
  email?: string;
  phone?: boolean;
  cocId?: string;
  introducer?: string;
  number?: number;
  position?: string;


  constructor(item?: IMember) {
    if (item) {
      this.name = item.name;
      this.type = item.type;
      this.email = item.email;
      this.phone = item.phone;
      this.cocId = item.cocId;
      this.introducer = item.introducer;
      this.number = item.number;
      this.position = item.position
    }
  }
}

export interface IGroups {
  name: string;
  id?: string;
  order: string;
  balance: string;
  deleted: boolean;
  isForever?: boolean;
  timeSpan?: number;
}
export interface IPosition {
  title: string;
  des: string;
}


@Injectable()
export class ChamberMemberService {

  constructor(private httpService: HttpService) {
  }

  get(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/candidates`, options)
      .map(res => res.json())
  }

  getMember(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/members`, options)
      .map(res => res.json())
  }

  getFindMember(id: string, postId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/members/${postId}`, options)
      .map(res => res.json())
  }

  getFind(id: string, postId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/candidates/${postId}`, options)
      .map(res => res.json())
  }

  getFindApplies(id: string, postId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/applies/${postId}`, options)
      .map(res => res.json())
  }


  store(id: string, data: any): Observable<any> {
    return this.httpService
      .post(`enterprise/enterprises/cocs/${id}/invitations`, data)
      .map(res => res.json().result)
  }


  update(id: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/applies/${data['candidateId']}`, data)
      .map(res => res.json().result)
  }

  updateMember(id: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/members/${data['memberId']}`, data)
      .map(res => res.json().result)
  }

  delete(id: string, postId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/members/${postId}`)
      .map(res => res.json().result);
  }
}
