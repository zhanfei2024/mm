import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../common/http/http.service";


export interface IAddKnow {
  type?: string,
  title?: string,
  content?: string,
}

export class AddKnow {
  type?: string;
  title?: string;
  content?: string;

  constructor(item?: IAddKnow) {
    if (item) {
      this.type = item.type;
      this.title = item.title;
      this.content = item.content;
    }
  }
}


@Injectable()
export class AddKnowService {

  constructor(private httpService: HttpService) {
  }

  get(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/coc-rules`, options)
      .map(res => res.json())
  }

  getFind(id: string, ruleId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/coc-rules/${ruleId}`, options)
      .map(res => res.json())
  }


  delete(id: string, ruleId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/coc-rules/${ruleId}`)
      .map(res => res.json().result);
  }
}
