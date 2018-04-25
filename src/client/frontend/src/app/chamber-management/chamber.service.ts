import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../common/http/http.service";
import * as _ from "lodash";

@Injectable()
export class ChamberService {
  formData: any;

  constructor(private httpService: HttpService) {
  }

  getCoc(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs`, options)
      .map(res => res.json())
  }

  getStatistics(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/statistics`, options)
      .map(res => res.json())
  }

  getFindCoc(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}`, options)
      .map(res => res.json())
  }

  getFindEnterprise(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/${id}`, options)
      .map(res => res.json())
  }

  deleteCoc(id: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}`)
      .map(res => res.json().result);
  }

  public itemsToFomart(value: Array<any> = []): any {
    let tagItem = [];
    value.map((item: any) => {
      tagItem.push({id: `${item.id}`, text: `${item.name}`})
    });
    return tagItem;
  }

  makeFileRequest(url: string, form: any, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.formData = new FormData();
      let xhr = new XMLHttpRequest();

      _.forEach(form, (n, key) => {
        this.formData.append(key, n);
      });
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
            let message = !_.isUndefined(JSON.parse(xhr.response).message[`${localStorage.getItem('lang')}`]) ? JSON.parse(xhr.response).message[`${localStorage.getItem('lang')}`] : JSON.parse(xhr.response).message;
          }
        }
      };
      xhr.open(type, url, true);
      xhr.setRequestHeader('Authorization', `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`);
      xhr.send(this.formData);
    });
  }
}
