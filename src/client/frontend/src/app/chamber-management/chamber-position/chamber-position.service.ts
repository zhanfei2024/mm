import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../common/http/http.service";


export interface IPosition {
  title?: string,
  description?: string,
}

export class Position {
  title?: string;
  description?: string;

  constructor(item?: IPosition) {
    if (item) {
      this.title = item.title;
      this.description = item.description;
    }
  }
}


@Injectable()
export class ChamberPositionService {

  constructor(private httpService: HttpService) {
  }

  get(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/member_ratings`, options)
      .map(res => res.json())
  }

  getFind(id: string, memberRatingId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/member_rating/${memberRatingId}`, options)
      .map(res => res.json())
  }

  store(id: string, data: any): Observable<any> {
    return this.httpService
      .post(`enterprise/enterprises/cocs/${id}/member_rating`, data)
      .map(res => res.json().result)
  }


  update(id: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/member_rating/${data['id']}`, data)
      .map(res => res.json().result)
  }

  delete(id: string, memberRatingId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/member_rating/${memberRatingId}`)
      .map(res => res.json().result);
  }
}
