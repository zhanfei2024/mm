import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpService} from '../../common/http/http.service';
import { URLSearchParams } from "@angular/http";
export interface CocPost {
  "id"?: string,
  "title"?: string,
  "slug"?: string,
  "content"?: string,
  "view"?: number,
  "isFeatured"?: boolean,
  "isActive"?: boolean,
  "isApproved"?: boolean,
  "isPublic"?: boolean,
  "updatedAt"?: string,
  "coc"?: {
    "id": string,
    "name": string,
    "logoUrl": string
  },
  "categories": [
    {
      "id"?: string,
      "name"?: string
    }
    ],
  "cover"?: string
}
export interface Industry {
  "id": string,
  "parentId": string,
  "name": string,
  "description": string
}
export interface CocCarousel {
  extension?: string,
  id?: string,
  isActive: boolean,
  name?: string,
  order?: number,
  path: string,
  title: string,
  url: string
}
@Injectable()
export class HomeService {

  constructor(private httpService: HttpService) {
  }

  /**
   *获取行业列表
   */
  getIndustries(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/industries`, options)
      .map(res => res.json())
  }
  /**
   *请求指定id的商会轮播图
   */
  findCocCarousel( data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/slide-show`, options)
      .map(res => res.json())
  }
  /**
   *
   * @param 商会列表
   * @returns {Observable<any>}
   */
  getCocs(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURIComponent(this.httpService.objectToParams(data))),
    };
    return this.httpService
      .get(`public/cocs`, options)
      .map(res => res.json())
  }
  /**
   *
   * @param 活动列表
   * @returns {Observable<any>}
   */
  getActivities(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURIComponent(this.httpService.objectToParams(data))),
    };
    return this.httpService
      .get(`public/activities`, options)
      .map(res => res.json())
  }
  /**
   *
   * @param 活动分类
   * @returns {Observable<any>}
   */
  getActivitiesCategories(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURIComponent(this.httpService.objectToParams(data))),
    };
    return this.httpService
      .get(`public/activities/categories`, options)
      .map(res => res.json())
  }
  /**
   *
   * @param 新闻列表
   * @returns {Observable<any>}
   */
  getNews(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURIComponent(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`public/posts`, options)
      .map(res => res.json())
  }

  getLink(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURIComponent(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`public/links`, options)
      .map(res => res.json())
  }

  getSetting(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/setting`, options)
      .map(res => res.json())
  }

}
