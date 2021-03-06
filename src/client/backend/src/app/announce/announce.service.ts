import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

export interface AddIndustry {
  id?: string,
  order?: string,
  depth?: string,
  parentId?: number,
  description?: string,
  name?: string,
  isActive?:string
}

export class AddIndustry {
  id?: string;
  order?: string;
  depth?: string;
  parentId?: number;
  description?: string;
  name?: string;
  isActive?:string


  constructor(item?: AddIndustry) {
    if (item) {
      this.id = item.id;
      this.depth = item.depth;
      this.order = item.order;
      this.description = item.description;
      this.parentId = item.parentId;
      this.name = item.name;
      this.isActive = item.isActive;

    }
  }
}


@Injectable()
export class AnnounceService {

  constructor(private httpService: HttpService) {
  }

  getAllindustries(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/announcements`, options)
      .map(res => res.json())
  }

  find(id: string, cocId: string ): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams({}))
    };
    return this.httpService
      .get(`admin/announcements/${id}?cocId=${cocId}`, options)
      .map(res => res.json().result)
  }

  store(data: any): Observable<any> {
    return this.httpService
      .post('admin/announcements', data)
      .map(res => res.json().result)
  }

  update(data: any): Observable<any> {
    return this.httpService
      .put(`admin/admin/industries/${data['id']}`, data)
      .map(res => res.json().result)
  }

  delete(id: string): Observable<boolean> {
    return this.httpService
      .delete(`admin/announcements/${id}`)
      .map(res => res.json().result);
  }

}
