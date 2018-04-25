import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../common/http/http.service";


export interface INews {
  slug?: string,
  title?: string,
  content?: string,
  isPublic?: boolean,
}

export class News {
  slug?: string;
  title?: string;
  content?: string;
  isPublic?: boolean;


  constructor(item?: INews) {
    if (item) {
      this.slug = item.slug;
      this.isPublic = item.isPublic;
      this.title = item.title;
      this.content = item.content;
    }
  }
}


@Injectable()
export class ChamberNewsService {

  constructor(private httpService: HttpService) {
  }

  get(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/posts`, options)
      .map(res => res.json())
  }

  getFind(id: string, postId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/posts/${postId}`, options)
      .map(res => res.json())
  }

  delete(id: string, postId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/posts/${postId}`)
      .map(res => res.json().result);
  }


  getNotice(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/announcements`, options)
      .map(res => res.json())
  }

  getFindNotice(id: string, postId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/announcements/${postId}`, options)
      .map(res => res.json())
  }

  deleteNotice(id: string, postId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/announcements/${postId}`)
      .map(res => res.json().result);
  }

}
