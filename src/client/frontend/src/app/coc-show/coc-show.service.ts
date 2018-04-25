import {Injectable} from '@angular/core';
import {HttpService} from '../../common/http/http.service';
import {Observable} from 'rxjs';
import {URLSearchParams} from '@angular/http';

export class NewsDetail {
  "id": string;
  "title": string;
  "slug": string;
  "content": string;
  "view": number;
  "isFeatured": boolean;
  "isActive": boolean;
  "isApproved": boolean;
  "isPublic": boolean;
  "updatedAt": string;
  "coc"?: any;
  "tags": any;
  "categories": [
    {
      "id": string,
      "name": string
    }
    ];
  "cover": string;
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

export interface ICoc {
  "id": string,
  "locationId"?: string,
  "name"?: string,
  "contacts"?: string,
  "phone"?: string,
  "locations"?: any,
  "email"?: string,
  "webDomain"?: string,
  "foundingDate"?: string,
  "scale"?: string,
  "field"?: string,
  "isApproved"?: boolean,
  "coverImage"?: string,
  "qualifications"?: string,
  "view"?: number,
  "purpose"?: string,
  "description"?: string,
  "title": string,
  "content": string,
  "address": [
    {
      "address"?: string,
      "phone"?: string,
      "fax"?: string,
      "email"?: string
    }
    ],
  "country"?: any,
  "industry"?: any,
  "logoUrl"?: any,
  "coverImageUrl"?: any
}

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

export interface CocActivity {
  "id"?: string,
  "title"?: string,
  "slug"?: string,
  "startTimedAt"?: string,
  "endTimedAt"?: string,
  "signUpEndTimedAt"?: string,
  "expenses"?: string,
  "personnelNumber"?: number,
  "address"?: string,
  "organizers"?: string,
  "specialInfo"?: string,
  "description"?: string,
  "flow"?: string,
  "status"?: string,
  "view"?: number,
  "isActive"?: boolean,
  "isPublic"?: boolean,
  "isApproved"?: boolean,
  "isFeatured"?: boolean,
  "isFree"?: boolean,
  "applyNumberOfPeople"?: number,
  "coc": {
    "id"?: string,
    "name"?: string,
    "logoUrl"?: string
  },
  "candidates": any,
  "attachmnts": any,
  "categories": [
    {
      "name"?: string,
      "activityCategoriesMap": {
        "createdAt"?: string,
        "updatedAt"?: string,
        "activityId"?: string,
        "categoriesId"?: string
      }
    },
    {
      "name"?: string,
      "activityCategoriesMap": {
        "createdAt": string,
        "updatedAt": string,
        "activityId": string,
        "categoriesId": string
      }
    }
    ]
}

export interface CocHistories {
  coc: {
    id: string,
    name: string,
    logoUrl: string
  },
  id?: string,
  logoUrl?: string,
  name?: string,
  cocId?: string,
  content?: string,
  date?: string,
  enterpriseId?: string,
  isActive?: boolean
}

export interface CocNotice {
  "id"?: string,
  "enterpriseId"?: string,
  "cocId": string,
  "title": string,
  "content"?: string,
  "publishAt": string,
  "isActive"?: boolean,
  "coc": {
    "id"?: string,
    "locationId"?: string,
    "name"?: string,
    "contacts"?: string,
    "phone"?: string,
    "email"?: string,
    "webDomain"?: string,
    "foundingDate"?: string,
    "scale"?: string,
    "field"?: string,
    "isApproved"?: boolean,
    "coverImage"?: string,
    "qualifications"?: string,
    "view"?: number,
    "purpose"?: string,
    "description"?: string,
    "logoUrl"?: any,
    "coverImageUrl"?: any
  }
}

export interface RulesDetail {
  "id": string,
  "enterpriseId": string,
  "cocId": string,
  "type": string,
  "title": string,
  "content": string,
  "createdAt": string,
  "coc": {
    "id": string,
    "name": string,
    "logoUrl": string,
    "coverImageUrl": string
  }
}

export interface IMassage {
  enterpriseId?: string,
  cocId?: string,
  title?: string,
  leavingMessage?: string,
}

export class Massages {
  enterpriseId?: string;
  cocId?: string;
  title?: string;
  leavingMessage?: string;

  constructor(item?: IMassage) {
    if (item) {
      this.enterpriseId = item.enterpriseId;
      this.cocId = item.cocId;
      this.title = item.title;
      this.leavingMessage = item.leavingMessage;
    }
  }
}


@Injectable()
export class CocShowService {
  constructor(private httpService: HttpService) {
  }

  get(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`public/cocs/self`, options)
      .map(res => res.json())
  }

  getPositions(id: string, data: any= { }): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };

    return this.httpService
      .get(`public/cocs/${id}/member_ratings`, options)
      .map(res => res.json())
  }

  getGroup(id: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };

    return this.httpService
      .get(`public/cocs/${id}/groups`, options)
      .map(res => res.json())
  }

  /**
   *获取用户银行账户信息
   */
  getBank(id: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };

    return this.httpService
      .get(`public/cocs/${id}/bank`, options)
      .map(res => res.json())
  }

  applyCoc(id: string, data: any = {}): Observable<any> {
    return this.httpService
      .post(`user/users/cocs/${id}/candidates`, data)
      .map(res => res.json().result)
  }

  /**
   *请求指定id的商会信息
   */
  findCocSelf(id: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/cocs/${id}`, options)
      .map(res => res.json().result)
  }

  /**
   *请求指定id的商会轮播图
   */
  findCocCarousel(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/slide-show`, options)
      .map(res => res.json())
  }

  getTabs(id: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };

    return this.httpService
      .get(`public/cocs/${id}/tabs`, options)
      .map(res => res.json())
  }

  /**
   * 获取商会tab详情
   *
   */
  getTab(id: string, tabId: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };

    return this.httpService
      .get(`public/cocs/${id}/tabs/${tabId}`, options)
      .map(res => res.json())
  }

  /**

   /**
   *请求指定id的商会文章(商会新闻，慈善公益)
   */
  findCocPost(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/posts`, options)
      .map(res => res.json())
  }

  /**
   *请求指定id的商会活动列表
   */
  findCocActivities(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/activities`, options)
      .map(res => res.json())
  }

  /**
   *请求指定id的商会活动详情
   */
  findCocActivity(activityId: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/activities/${activityId}`, options)
      .map(res => res.json())
  }

  findActivities(id: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/activities/${id}`, options)
      .map(res => res.json())
  }

  /**
   *请求指定id的商会发展历程
   */
  findCocCourse(id: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/cocs/${id}/coc-histories`, options)
      .map(res => res.json())
  }

  /**
   *请求指定id的入会须知列表
   */
  findMemberNotice(id: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/cocs/${id}/rules`, options)
      .map(res => res.json())
  }

  /**
   *请求指定id的入会须知详情
   */
  findMemberRulesDetail(cocId: string, ruleId: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/cocs/${cocId}/rules/${ruleId}`, options)
      .map(res => res.json())
  }


  /**
   *请求指定id的商会公告
   */
  findCocNotice(id: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/cocs/${id}/announcements`, options)
      .map(res => res.json());
  }

  /**
   *请求指定id的商会公告详情
   */
  findMemberNoticeDetail(cocId: string, announcementId: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/cocs/${cocId}/announcements/${announcementId}`, options)
      .map(res => res.json())
  }

  /**
   *请求指定id的商会行业
   */
  findCocIndustry(data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/industry`, options)
      .map(res => res.json().result)
  }


  store(id: string, data: any = {}): Observable<any> {
    return this.httpService
      .post(`public/companies/${id}/click_traffic`, data)
      .map(res => res.json().result)
  }


  /**
   *获取企业文章
   */
  findEnterprisePost(cocId: string, postId: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/posts/${postId}`, options)
      .map(res => res.json())
  }

  /**
   *用户申请活动
   */
  storeCandidate(id: string, data: any = {}): Observable<any> {
    return this.httpService
      .post(`user/users/activities/${id}/candidate`, data)
      .map(res => res.json().result)
  }

  chekIsApply(cocId: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/cocs/${cocId}/is-coc-member`, options)
      .map(res => res.json())
  }

  chekIsctivitiesApply(activitieId: string, data: any = {}): Observable<any> {
    let options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/activities/${activitieId}/is-joined`, options)
      .map(res => res.json())
  }

  replyMessage(data: any = {}): Observable<any> {
    return this.httpService
      .post(`user/users/message`, data)
      .map(res => res.json().result)
  }

}
