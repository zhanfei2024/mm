import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {URLSearchParams} from '@angular/http';
import {HttpService} from "../../../../common/http/http.service";

export interface ISettled {
  id?: string,
  name?: string,
  industryId?: string,
  countryId?: string,
  foundingDate?: string,
  scale?: string,
  locationId?: string,
  purpose?: string,
  contacts?: string,
  phone?: string,
  address?: string,
  email?: string,
  description?: string,
  isApproved?:boolean
}

export class Settled {
  id?: string;
  name?: string;
  industryId?: string;
  countryId?: string;
  foundingDate?: string;
  scale?: string;
  locationId?: string;
  purpose?: string;
  phone?: string;
  contacts?: string;
  address?: string;
  email?: string;
  description?: string;
  isApproved?:boolean

  constructor(item?: ISettled) {
    if (item) {
      this.id = item.id;
      this.name = item.name;
      this.industryId = item.industryId;
      this.countryId = item.countryId;
      this.description = item.description;
      this.foundingDate = item.foundingDate;
      this.scale = item.scale;
      this.contacts = item.contacts;
      this.locationId = item.locationId;
      this.purpose = item.purpose;
      this.phone = item.phone;
      this.address = item.address;
      this.email = item.email;
      this.isApproved = item.isApproved
    }
  }
}

export interface IAddress {
  enterpriseId?: string,
  cocId?: string,
  address?: string,
  phone?: string,
  fax?: string,
  email?: string,
  isActive?: boolean,
}

export class Address {
  enterpriseId?: string;
  cocId?: string;
  address?: string;
  phone?: string;
  fax?: string;
  email?: string;
  isActive?: boolean;

  constructor(item?: IAddress) {
    if (item) {
      this.enterpriseId = item.enterpriseId;
      this.cocId = item.cocId;
      this.address = item.address;
      this.email = item.email;
      this.fax = item.fax;
      this.email = item.email;
      this.isActive = item.isActive;
    }
  }
}

export interface IEnterprises {
  lastName?: string,
  firstName?: string,
  email?: string,
  phone?: string,
}

export class Enterprises {
  lastName?: string;
  firstName?: string;
  email?: string;
  phone?: string;

  constructor(item?: IEnterprises) {
    if (item) {
      this.phone = item.phone;
      this.firstName = item.firstName;
      this.lastName = item.lastName;
      this.email = item.email;
    }
  }
}


@Injectable()
export class ChamberSettledService {

  constructor(private httpService: HttpService) {
  }

  storePosition(id: string, data: any): Observable<any> {
    return this.httpService
      .post(`enterprise/enterprises/cocs/${id}/member_rating`, data)
      .map(res => res.json().result)
  }

  storeGroup(id: string, data: any): Observable<any> {
    return this.httpService
      .post(`enterprise/enterprises/cocs/${id}/groups`, data)
      .map(res => res.json().result)
  }

  getCountries(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/countries`, options)
      .map(res => res.json())
  }

  getLocations(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/locations`, options)
      .map(res => res.json())
  }

  getIndustries(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`public/industries`, options)
      .map(res => res.json())
  }


  getEnterprises(data: any = {}): Observable<any> {
    const options = {
      params: new URLSearchParams(this.httpService.objectToParams(data))
    };
    return this.httpService
      .get(`enterprise/enterprises/self`, options)
      .map(res => res.json())
  }

  updateEnterprises(data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/${data['id']}`, data)
      .map(res => res.json().result)
  }

  storeAddress(id: string, data: any): Observable<any> {
    return this.httpService
      .post(`enterprise/enterprises/cocs/${id}/coc-addresses`, data)
      .map(res => res.json().result)
  }


  updateAddress(id: string, data: any): Observable<any> {
    return this.httpService
      .put(`enterprise/enterprises/cocs/${id}/coc-addresses/${data['id']}`, data)
      .map(res => res.json().result)
  }

}
