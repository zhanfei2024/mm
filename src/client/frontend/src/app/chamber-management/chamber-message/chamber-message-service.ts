import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../common/http/http.service";


export interface IMassage {
  messageReply?: string,
}

export class Massage {
  messageReply?: string;

  constructor(item?: IMassage) {
    if (item) {
      this.messageReply = item.messageReply;
    }
  }
}


@Injectable()
export class ChamberMessageService {

  constructor(private httpService: HttpService) {
  }

  get(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/message`, options)
      .map(res => res.json())
  }


  getFind(id: string, postId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/message/${postId}`, options)
      .map(res => res.json())
  }


  update(id: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/message/${data['messageId']}`, data)
      .map(res => res.json().result)
  }


  delete(id: string, postId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/message/${postId}`)
      .map(res => res.json().result);
  }
}
