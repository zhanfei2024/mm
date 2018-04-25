import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../common/http/http.service";


export interface IPayment {
  bankName?: string,
  cardNumber?: string,
  accountHolder?: string,
  depositBank?: string,
  payType?:string

}

export class Payment {
  bankName?: string;
  cardNumber?: string;
  accountHolder?: string;
  depositBank?: string;
  payType?:string;
}


@Injectable()
export class ChamberPaymentSevice {

  constructor(private httpService: HttpService) {
  }

  get(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/bank`, options)
      .map(res => res.json())
  }

  getFind(id: string, postId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/bank/${postId}`, options)
      .map(res => res.json())
  }

  store(id: string, data: any): Observable<any> {
    return this.httpService
      .post(`enterprise/enterprises/cocs/${id}/bank`, data)
      .map(res => res.json().result)
  }


  update(id: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/bank/${data['id']}`, data)
      .map(res => res.json().result)
  }

  delete(id: string, postId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/bank/${postId}`)
      .map(res => res.json().result);
  }
}
