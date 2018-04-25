import {Injectable} from "@angular/core";
import {HttpService, IMeta} from "../../common/http/http.service";
import {Observable} from "rxjs";
import {URLSearchParams, Http} from "@angular/http";
import {TranslateService} from "@ngx-translate/core";

export class Member {
  "id": string;
  "userId": string;
  "countryId": string;
  "name": string;
  "IDNumber": string;
  "gender": string;
  "phone": string;
  "avatar": string;
  "description": string;
  "IDType": string;
  "age": string;
  "email": string;
  "remark": string;
  "country": {
    "id": string,
    "name": string,
    "code": string
  }
}
export interface Invitation {
  "id": string,
  "enterpriseId": string,
  "type": string,
  "status": string,
  "email": string,
  "paymentBalance": number,
  "statement1": boolean,
  "statement2": boolean,
  "statement3": boolean,
  "appliedAt": string,
  "attachment": string,
  "invitationAt": string,
  "description": string,
  "remark": string,
  "user": User,
  "coc": {
    "id": string,
    "name": string,
    "logoUrl": string
  },
  "group": {
    "id": string,
    "name": string
  },
  "companies": any[],
  "url": string
}
export interface Coc {
  appliedAt: string,
  attachment: string,
  coc: { id: string, name: string, logoUrl: string },
  id: string,
  logoUrl: string,
  name: string,
  companies: any[]
  description: string
  email: string
  enterpriseId: string,
  group: { id: string, name: string }
  invitationAt: string,
  paymentBalance: number,
  remark: string,
  statement1: boolean,
  statement2: boolean,
  statement3: boolean,
  status: string,
  type: string,
  url: string,
  user: User,
}
export interface Activity {
  activities: { id: string, title: string }
  id: string,
  title: string,
  activityId: string,
  coc: { id: string, name: string, logoUrl: string },
  logoUrl: string,
  name: string,
  contact: string,
  email: string,
  enterpriseId: string,
  numberOfPeople: number,
  paymentBalance: string,
  phone: string,
  remark: string,
  status: string,
  user: User
}
export interface User {
  "id": string,
  "lastName": string,
  "firstName": string,
  "email": string,
  "userEducation": UserEducation[ ],
  "userExperience": UserExperience[ ]
}
export class Item {
  "id": number;
  "text": string;
}
export class UserExperience {
  "companyName": string;
  "startedDate": string;
  "endedDate": string;
  "description": string;
  "position": string;
}

export class UserCompany {
  "address": string;
  "businessNo": string;
  "companyName": string;
  "companyEmail": string;
  "industryId": string;
  "id": string;
  "isActive": boolean;
  "legalPersonName": string;
  "mobile": string;
  "scopeOfOperation": string;
  "userId": string;
  "isDefault": boolean;
}

export class UserEducation {
  "id": string;
  "userId": string;
  "educationLevel": string;
  "schoolName": string;
  "subject": string;
  "gpa": string;
  "graduationYear": number;
  "startDate": string;
  "endDate": string;
  "description": string;
  "remark": string;
  "createdAt": string;
  "updatedAt": string;
}


export interface Activity {
  "id": string,
  "title": string,
  "applyStatus": string,
  "cocName": string,
  "slug": string,
  "startTimedAt": string,
  "endTimedAt": string,
  "signUpEndTimedAt": string,
  "expenses": string,
  "personnelNumber": string,
  "address": string,
  "organizers": string,
  "specialInfo": string,
  "description": string,
  "flow": string,
  "status": string,
  "view": number,
  "isActive": boolean,
  "isPublic": boolean,
  "isApproved": boolean,
  "isFeatured": boolean,
  "isFree": boolean,
  "applyNumberOfPeople": number,
}

@Injectable()
export class UserService {
  constructor(private httpService: HttpService,
              private translate: TranslateService) {

  }

  /**
   *获取行业
   */
  getIndustry(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/industries`, options)
      .map(res => res.json());
  }
  /**
   *获取地区列表
   */
  getCountryIds(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/locations`, options)
      .map(res => res.json());
  }
  /**
   *获取商会邀请列表
   */
  getInvitations(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/invitations`, options)
      .map(res => res.json());
  }
  /**
   *同意或拒绝邀请
   */
  reponseInvitations(invitationsId, data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .put(`user/users/invitations/${invitationsId}`, data)
      .map(res => res.json());
  }
  /**
   *获取会员商会申请列表
   */
  getCocApplies(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/candidates`, options)
      .map(res => res.json());
  }
  /**
   *获取会员活动申请列表
   */
  getActivityApplies(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/activities/candidates`, options)
      .map(res => res.json());
  }
  /**
   *获取会员用户信息
   */
  getProfile(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/user-profile`, options)
      .map(res => res.json());
  }
  /**
   *添加会员用户信息
   */
  createProfile(data: any): Observable<Member> {
    return this.httpService
      .post(`user/users/user-profile`, data)
      .map(res => res.json());
  }
  /**
   *修改会员用户信息
   */
  updateProfile(data: any): Observable<Member> {
    return this.httpService
      .put(`user/users/user-profile`, data)
      .map(res => res.json());
  }
  /**
   *获取会员工作经验列表
   */
  getExperience(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/experience`, options)
      .map(res => res.json());
  }
  /**
   *添加工作经验
   */
  postExperience(data: any): Observable<any> {
    return this.httpService
      .post(`user/users/experience`, data)
      .map(res => res.json());
  }
  /**
   *修改工作经验
   */
  updatExperience(data: any): Observable<any> {
    return this.httpService
      .put(`user/users/experience/${data['id']}`, data)
      .map(res => res.json());
  }
  /**
   *获取会员公司列表
   */
  getCompany(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/user-company`, options)
      .map(res => res.json());
  }
  /**
   *添加公司
   */
  postCompany(data: any): Observable<any> {
    return this.httpService
      .post(`user/users/user-company`, data)
      .map(res => res.json());
  }
  /**
   *修改公司
   */
  putCompany(data): Observable<any> {
    return this.httpService
      .put(`user/users/user-company/${data['id']}`, data)
      .map(res => res.json());
  }

  /**
   *获取会员教育背景列表
   */
  getEducation(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/user-education`, options)
      .map(res => res.json());
  }
  /**
   *添加教育背景
   */
  postEducation(data: any): Observable<any> {
    return this.httpService
      .post(`user/users/user-education`, data)
      .map(res => res.json());
  }
  /**
   *修改教育背景
   */
  putEducation(data: any): Observable<any> {
    return this.httpService
      .put(`user/users/user-education/${data['id']}`, data)
      .map(res => res.json());
  }

  deleteEducation(id: number): Observable<User> {
    return this.httpService
      .delete(`user/users/user-education/${id}`)
      .map(res => res.json().result)
  }

  deleteCompany(id: number): Observable<User> {
    return this.httpService
      .delete(`user/users/user-company/${id}`)
      .map(res => res.json().result)
  }

  deleteExperience(id: number): Observable<User> {
    return this.httpService
      .delete(`user/users/experience/${id}`)
      .map(res => res.json().result)
  }

  getAnnouncements(id:string,data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/cocs/${id}/announcements`, options)
      .map(res => res.json());
  }

  getMessages(data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/message`, options)
      .map(res => res.json());
  }

  getFindMessages(id:string,data: any = {}): Observable<any> {
    let options = {
      search: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`user/users/message/${id}`, options)
      .map(res => res.json());
  }



  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }
}
