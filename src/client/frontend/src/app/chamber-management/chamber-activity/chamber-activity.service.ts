import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../common/http/http.service";


export interface IActivity {
  title?: string,
  hostCoc?: string,
  hostContacts?: string,
  hostPhone?: string,
  hostEmail?: string,
  id?: string,
  slug?: string,
  startTimedAt?: string,
  endTimedAt?: string,
  signUpEndTimedAt?: string,
  expenses?: number,
  personnelNumber?: string,
  address?: string,
  description?: string,
  categoryIds?: any[],
  attachments?: any[],
  isPublic?: boolean,
}

export class Activity {
  title?: string;
  id?: string;
  slug?: string;
  startTimedAt?: string;
  endTimedAt?: string;
  signUpEndTimedAt?: string;
  expenses?: number;
  personnelNumber?: string;
  hostCoc?: string;
  hostContacts?: string;
  hostPhone?: string;
  hostEmail?: string;
  address?: string;
  description?: string;
  categoryIds?: any[];
  attachments?: any[];
  isPublic?: boolean;

  constructor(item?: IActivity) {
    if (item) {
      this.slug = item.slug;
      this.id = item.id;
      this.hostCoc = item.hostCoc;
      this.hostContacts = item.hostContacts;
      this.hostPhone = item.hostPhone;
      this.hostEmail = item.hostEmail;
      this.title = item.title;
      this.startTimedAt = item.startTimedAt;
      this.endTimedAt = item.endTimedAt;
      this.signUpEndTimedAt = item.signUpEndTimedAt;
      this.expenses = item.expenses;
      this.personnelNumber = item.personnelNumber;
      this.address = item.address;
      this.attachments = item.attachments;
      this.categoryIds = item.categoryIds;
      this.description = item.description;
      this.isPublic = item.isPublic;
    }
  }
}


@Injectable()
export class ChamberActivityService {

  constructor(private httpService: HttpService) {
  }

  get(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/activities`, options)
      .map(res => res.json())
  }

  getCategories(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`public/activities/categories`, options)
      .map(res => res.json())
  }

  getFind(id: string, ruleId: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/activities/${ruleId}`, options)
      .map(res => res.json())
  }



  delete(id: string, ruleId: string): Observable<boolean> {
    return this.httpService
      .delete(`enterprise/enterprises/cocs/${id}/activities/${ruleId}`)
      .map(res => res.json().result);
  }

  getCandidates(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/activities/candidates`, options)
      .map(res => res.json())
  }

  updateCandidates(id: string, activityId: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/activities/${activityId}/candidates/${data['candidateId']}`, data)
      .map(res => res.json().result)
  }

  exportCandidates(id: string, data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(decodeURI(this.httpService.objectToParams(data)))
    };
    return this.httpService
      .get(`enterprise/enterprises/cocs/${id}/activities/candidates/exports`, options)
      .map(res => res.json())
  }

}
