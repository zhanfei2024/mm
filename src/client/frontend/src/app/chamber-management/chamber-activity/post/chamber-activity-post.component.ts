import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Activity, ChamberActivityService, IActivity} from "../chamber-activity.service";
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {ChamberService} from "../../chamber.service";
import {Config} from "../../../../common/config/config";

declare var laydate;

@Component({
  templateUrl: './chamber-activity-post.component.html',
})
export class ChamberActivityPostComponent implements OnInit {
  public submitLoading: boolean;
  public isCover: boolean;
  public isSave: boolean;
  public id: string;
  public title: string;
  public fileName: string;
  public description: string;
  public activeatePublic: any[] = [];
  public activity: IActivity;
  public categories: any[] = [];
  public categoryIds: any[] = [];
  public activeategoryIds: any[] = [];
  public logoUrl: string = '../../../assets/img/logo/default_company_icon.png';
  public editlogoUrl: string;
  public postUrl: any;

  @ViewChild('cover') cover;
  @ViewChild('startTimedAt') _layStartDate: ElementRef;
  @ViewChild('endTimedAt') _layEndDate: ElementRef;
  @ViewChild('signUpEndTimedAt') _laySignUpDate: ElementRef;

  @ViewChild('titleHanlder') public titleHanlder: ElementRef;
  @ViewChild('startTimedAtHanlder') public startTimedAtHanlder: ElementRef;
  @ViewChild('endTimedAtHanlder') public endTimedAtHanlder: ElementRef;
  @ViewChild('signUpEndTimedAtHanlder') public signUpEndTimedAtHanlder: ElementRef;
  @ViewChild('addressHanlder') public addressHanlder: ElementRef;
  @ViewChild('isPublicHanlder') public isPublicHanlder: ElementRef;
  @ViewChild('personnelNumberHanlder') public personnelNumberHanlder: ElementRef;
  @ViewChild('descriptionHanlder') public descriptionHanlder: ElementRef;


  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    if (this.titleHanlder['dirty'] || this.startTimedAtHanlder['dirty']
      || this.endTimedAtHanlder['dirty'] || this.signUpEndTimedAtHanlder['dirty']
      || this.addressHanlder['dirty'] || this.isPublicHanlder['dirty']
      || this.personnelNumberHanlder['dirty'] || this.descriptionHanlder['dirty']) {
      $event['returnValue'] = 'Your data will be lost!';
    }
  }


  constructor(private chamberActivityService: ChamberActivityService,
              private toasterService: ToasterService,
              public translate: TranslateService,
              private activeRouter: ActivatedRoute,
              private chamberService: ChamberService,
              private config: Config,
              private router: Router) {
  }


  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.activeRouter.data.subscribe((data: { FindResolve: any }) => {
      if (!_.isUndefined(data.FindResolve)) {
        this.activity = data.FindResolve.result;
        this.description = this.activity.description;
        this.logoUrl = this.activity.attachments[0].url;
        this.isCover = true;
        this.title = 'chamber.btn.edit_activity';
        if (this.activity['categories'].length > 0) {
          this.activeategoryIds[0] = {
            id: this.activity['categories'][0]['activityCategoriesMap']['categoriesId'],
            text: this.activity['categories'][0]['name']
          };
        }
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/activities/${this.activity.id}`;
      } else {
        this.activity = new Activity();
        this.activity.isPublic = true;
        this.title = 'chamber.btn.add_activity';
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/activities`;
      }
      this.activity.expenses = 0;
    });
    this.reloadCategories();
    this.reloadCoc();
    this.addLayDate(this._layStartDate, 'startTimedAt');
    this.addLayDate(this._layEndDate, 'endTimedAt');
    this.addLayDate(this._laySignUpDate, 'signUpEndTimedAt');
  }

  async reloadCoc() {
    try {
      let data = await this.chamberService.getFindCoc(localStorage.getItem('chamber')).toPromise();
      if (_.isUndefined(this.activity.id)) {
        this.activity.hostCoc = data.result.name;
        this.activity.hostContacts = data.result.contacts;
        this.activity.hostEmail = data.result.email;
        this.activity.hostPhone = data.result.phone;
      }
    } catch (err) {
    }
  }


  async reloadCategories() {
    try {
      let data = await this.chamberActivityService.getCategories({}).toPromise();
      this.categories = this.chamberService.itemsToFomart(data.result);
      _.remove(this.categories, (n)=> {
        return n.id == '1';
      });
    } catch (err) {
    }
  }

  selected(data: any, type: string) {
    if (type === 'categoryIds') {
      this.categoryIds[0] = data.id;
    } else {
      this.activity.isPublic = data.id;
    }
  }

  editCountChange(event) {
    if (_.isUndefined(this.activity.id)) {
      this.logoUrl = event.url;
    } else {
      this.editlogoUrl = event.url;
    }
  }


  async onSubmit() {
    try {
      this.submitLoading = true;
      this.isSave = true;
      let funcName = _.isUndefined(this.activity.id) ? 'post' : 'put';
      let message = funcName === 'store' ? 'message.store_message' : 'message.update_message';
      this.activity.description = this.description;
      if (this.categoryIds.length > 0) {
        this.activity.categoryIds = this.categoryIds;
      }
      if (_.isUndefined(this.activity.id) && this.logoUrl === '../../../assets/img/logo/default_company_icon.png') {
        this.toasterService.pop('error', 'error', this.translate.instant('message.file_cover_error'));
        this.submitLoading = false;
        return;
      }
      let data = await this.chamberService.makeFileRequest(this.postUrl, this.activity, funcName);
      if (_.isUndefined(this.activity.id) && this.logoUrl !== '../../../assets/img/logo/default_company_icon.png') {
        this.cover.authToken = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
        this.cover.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${localStorage.getItem('chamber')}/activities/${data.result.id}/attachments`;
        this.cover.form = {
          type: 'cover'
        };
        await this.cover.upload('POST');
      }
      if (!_.isUndefined(this.activity.id) && !_.isUndefined(this.editlogoUrl)) {
        this.cover.authToken = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
        this.cover.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${localStorage.getItem('chamber')}/activities/${data.result.id}/attachments`;
        this.cover.form = {
          type: 'cover'
        };
        await this.cover.upload('POST');
      }
      this.toasterService.pop('success', 'Success', this.translate.instant(message));
      this.submitLoading = false;
      this.router.navigate(['/chamber', localStorage.getItem('chamber'), 'activity', 'list'])
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'Error', err.message);
    }
  }

  addLayDate(elem: any, model: any) {
    laydate.render({
      elem: elem.nativeElement
      , type: 'datetime'
      , theme: '#0b409c'
      , lang: localStorage.getItem('lang')
      , done: (value) => {
        this.activity[model] = value;
      }
    });
  }


}
