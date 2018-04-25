import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';

@Injectable()
export class ActivityService {

  constructor(private httpService: HttpService) {
  }

  getAllOrders(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/activities`, options)
      .map(res => res.json())
  }

  getAllCategory(data: any = {}): Observable<any> {
    return this.httpService
      .get(`admin/activities/categories`)
      .map(res => res.json())
  }

  find(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/activities/${id}`, options)
      .map(res => res.json().result)
  }
  delete(data: any): Observable<any> {
    return this.httpService
      .delete(`admin/activities/${data['id']}`, data)
      .map(res => res.json().result)
  }

  update(data: any): Observable<any> {
    return this.httpService
      .put(`admin/activities/${data['id']}`, data)
      .map(res => res.json().result)
  }

  public itemsToFomart(value: Array<any> = []): any {
    let tagItem = [];
    value.map((item: any) => {
      tagItem.push({id: `${item.id}`, text: `${item.name}`})
    });
    return tagItem;
  }

}
