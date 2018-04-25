import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from '../../common/http/http.service';


export interface AddCategory {
  id?: string,
  order?: string,
  depth?: string,
  parentId?: number,
  description?: string,
  name?: string,
  isActive?:string
}

export class AddCategory {
  id?: string;
  order?: string;
  depth?: string;
  parentId?: number;
  description?: string;
  name?: string;
  isActive?:string


  constructor(item?: AddCategory) {
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
export class ActivityCategoryService {

  constructor(private httpService: HttpService) {
  }

  getAllOrders(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/activities/categories`, options)
      .map(res => res.json())
  }



  find(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`admin/activities/categories/${id}`, options)
      .map(res => res.json().result)
  }
  delete(data: any = {}): Observable<any> {
    return this.httpService
      .delete(`admin/activities/categories/${data.id}`)
      .map(res => res.json().result)
  }


  store(data: any): Observable<any> {
    return this.httpService
      .post('admin/activities/categories', data)
      .map(res => res.json().result)
  }

  update(data: any): Observable<any> {
    return this.httpService
      .put(`admin/activities/categories/${data['id']}`, data)
      .map(res => res.json().result)
  }

}
