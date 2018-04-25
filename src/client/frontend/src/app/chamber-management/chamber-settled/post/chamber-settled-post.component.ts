import {Component, DoCheck, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChamberSettledService, Enterprises, ISettled, Settled} from "./chamber-settled.service";
import * as _ from "lodash";
import {TranslateService} from "@ngx-translate/core";
import {ToasterService} from "angular2-toaster";
import {Config} from "../../../../common/config/config";
import {ChamberService} from "../../chamber.service";
import * as moment from "moment";
import {SeoService} from "../../../../common/global/seo";
import {IGroups, IPosition} from "../../chamber-member/list/chamber-member.service";
import {DialogService} from "../../../../common/dialog/dialog.service";
import {ChamberMemberGroupService} from "../../chamber-member/list/chamber-member-group.service";


declare var laydate;

@Component({
  templateUrl: './chamber-settled-post.component.html',
})

export class ChamberSettledPostComponent implements OnInit, DoCheck {
  public isShow: boolean = false;
  public isCover: boolean = false;
  public submitLoading: boolean = false;
  public isEmail: boolean = true;
  public isSave: boolean;
  public industries: any[] = [];
  public scale: any[] = [
    {id: '30-50', text: '30 - 50'},
    {id: '50-100', text: '50 - 100'},
    {id: '100+', text: '100+'},
  ];
  public activeIndustries: any[] = [];
  public activeLocations: any[] = [];
  public activeScale: any[] = [];
  public enterprises: any;
  public address: any;
  public fileName: string;
  public editLogoUrl: any;
  public editCoverUrl: any;
  public postUrl: any;
  public editQualificationUrl: any;
  public logoUrl: string = '../../../assets/img/logo/default_company_icon.png';
  public coverUrl: string = '../../../assets/img/logo/default_company_icon.png';
  public qualificationUrl: string = '../../../assets/img/logo/default_company_icon.png';
  public frontUrl: string = '../../../assets/img/logo/default_company_icon.png';
  public locations: any[] = [];
  public settled: ISettled;
  public groups: IGroups[] = [{name: '', balance: '', deleted: false, order: '', timeSpan: 0, isForever: false}];
  public positions: IPosition[] = [{title: '', des: ''}];
  public selectGroups: IGroups[] = [];
  public times: any[] = [];
  public cocId: string;
  public postGroupSuccess: boolean;
  public postPositionSuccess: boolean;
  @ViewChild('logo') logo;
  @ViewChild('cover') cover;
  @ViewChild('front') front;
  @ViewChild('qualification') qualifications;

  @ViewChild('firstNameHandler') public firstNameHandler: ElementRef;
  @ViewChild('lastNameHandler') public lastNameHandler: ElementRef;
  @ViewChild('ePhoneHandler') public ePhoneHandler: ElementRef;
  @ViewChild('eEmailHandler') public eEmailHandler: ElementRef;
  @ViewChild('nameHandler') public nameHandler: ElementRef;
  @ViewChild('scaleHandler') public scaleHandler: ElementRef;
  @ViewChild('foundingDateHandler') public foundingDateHandler: ElementRef;
  @ViewChild('contactsHandler') public contactsHandler: ElementRef;
  @ViewChild('phoneHandler') public phoneHandler: ElementRef;
  @ViewChild('emailHandler') public emailHandler: ElementRef;
  @ViewChild('addressHandler') public addressHandler: ElementRef;
  @ViewChild('purposeHandler') public purposeHandler: ElementRef;
  @ViewChild('descriptionHandler') public descriptionHandler: ElementRef;
  @ViewChild('myDate') _date: ElementRef;


  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    if (this.nameHandler['dirty'] || this.scaleHandler['dirty']
      || this.foundingDateHandler['dirty'] || this.contactsHandler['dirty']
      || this.phoneHandler['dirty'] || this.emailHandler['dirty']
      || this.addressHandler['dirty'] || this.purposeHandler['dirty']
      || this.descriptionHandler['dirty']) {
      $event['returnValue'] = 'Your data will be lost!';
    }
  }

  constructor(private activatedRoute: ActivatedRoute,
              private chamberSettledService: ChamberSettledService,
              public translate: TranslateService,
              private chamberService: ChamberService,
              private router: Router,
              private config: Config,
              private seoService: SeoService,
              private dialogService: DialogService,
              private chamberMemberGroupService: ChamberMemberGroupService,
              private toasterService: ToasterService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant('chamber.btn.add_coc'), this.seoService.getTitleContent());
    this.times = [
      {id: '1', text: '1'},
      {id: '2', text: '2'},
      {id: '3', text: '3'},
      {id: '4', text: '4'},
      {id: '5', text: '5'},
      {id: '6', text: '6'},
      {id: '7', text: '7'},
      {id: '8', text: '8'},
      {id: '9', text: '9'},
      {id: '10', text: '10'},
      {id: '11', text: '11'},
      {id: '12', text: '12'},
    ];
  }

  ngOnInit() {
    laydate.render({
      elem: this._date.nativeElement
      , showBottom: false
      , theme: '#0b409c'
      , lang: localStorage.getItem('lang')
      , done: (value) => {
        this.settled.foundingDate = value;
      }
    });
    this.activatedRoute.data.subscribe((data: { FindResolve: any }) => {
      if (_.isUndefined(data.FindResolve)) {
        this.settled = new Settled();
        this.settled.countryId = '99';
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs`;
      } else {
        this.settled = data.FindResolve.result;
        this.logoUrl = !_.isUndefined(this.settled['logoUrl']) ? this.settled['logoUrl'] : '../../../assets/img/logo/default_company_icon.png';
        this.isCover = true;
        this.coverUrl = !_.isUndefined(this.settled['coverImageUrl']) ? this.settled['coverImageUrl'] : '../../../assets/img/logo/default_company_icon.png';
        this.qualificationUrl = !_.isUndefined(this.settled['qualificationUrl']) ? this.settled['qualificationUrl'] : '../../../assets/img/logo/default_company_icon.png';
        this.activeIndustries[0] = {id: this.settled['industry'].id, text: this.settled['industry'].name};
        this.activeScale[0] = {id: this.settled.scale, text: this.settled.scale};
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.settled.id}`;
        if (!_.isUndefined(this.settled['locations'])) {
          this.activeLocations[0] = {id: this.settled['locations'].id, text: this.settled['locations'].name};
        }
      }
    });
    if (location.hash === '#/coc/settled') {
      this.isShow = true;
      this.enterprises = new Enterprises();
      this.getEnterprises();
    }
    this.getIndustries();
    this.getLocations();
  }

  /**
   * 第二次提交
   */

  /**
   *创建会籍
   */
  async storeGroup(id: string, data: any): Promise<any> {
    try {
      this.postGroupSuccess = false;
      let response = this.chamberSettledService.storeGroup(id, data).toPromise();
      this.postGroupSuccess = true;
    } catch (err) {
      this.postGroupSuccess = false;
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  /**
   *创建职务
   */
  async storePosition(id: string, data: any): Promise<any> {
    try {
        this.postPositionSuccess = false;
        let response = this.chamberSettledService.storePosition(id, data).toPromise();
        this.postPositionSuccess = true;
    } catch (err) {
      this.postPositionSuccess = false;
      this.toasterService.pop('err', 'Error', err.message);
    }
  }




  //获取企业
  async getEnterprises(): Promise<any> {
    try {
      let data = await this.chamberSettledService.getEnterprises({}).toPromise();
      this.enterprises.id = data.result.id;
      this.enterprises.email = data.result.email;
    } catch (err) {

    }
  }

  //获取行业
  async getIndustries(): Promise<any> {
    try {
      let data = await this.chamberSettledService.getIndustries({}).toPromise();
      this.industries = this.chamberService.itemsToFomart(data.result);
    } catch (err) {

    }
  }


  //获取地区
  async getLocations(): Promise<any> {
    try {
      let data = await this.chamberSettledService.getLocations({}).toPromise();
      this.locations = this.chamberService.itemsToFomart(data.result);
    } catch (err) {

    }
  }

  /**
   * 选择会籍期限
   */

  changTimes(index: any, data: any) {
    this.groups[index].timeSpan = _.toNumber(data.id);
    this.groups[index].isForever = false;
  }

  async deleteGroups(id: string): Promise<any> {
    try {
      const confirmed = await this.dialogService.confirm('confirm delete?');
      if (confirmed) {
        await this.chamberMemberGroupService.delete(this.cocId, id).toPromise();
        this.toasterService.pop('success', '', this.translate.instant('message.delete_success'));
      }
    } catch (err) {

    }
  }

  /**
   * 添加会籍
   */

  addGroup(status: string, isForever?: boolean) {
    switch (status) {
      case 'group':
        if (isForever) {
          this.groups.push({name: '', balance: '', deleted: true, order: '', timeSpan: 0, isForever: true});
        } else {
          this.groups.push({name: '', balance: '', deleted: false, order: '', timeSpan: 0, isForever: false});
        };
        break;
      case 'position':
        this.positions.push({title: '', des: ''});
    }
  }

  /**
   * 删除会籍
   */
  deleteGroup(index: number, status: string) {
    switch (status) {
      case 'group':
        if (this.groups[index].id !== "") {
          this.deleteGroups(this.groups[index].id);
          this.groups.splice(index, 1);
        } else {
          this.groups.splice(index, 1);
        }
        break;
      case 'position':
        this.positions.splice(index, 1);
    }

  }

  editCountChange(event) {
    if (_.isUndefined(this.settled.id)) {
      switch (event.type) {
        case 'logo':
          this.logoUrl = event.url;
          break;
        case 'front':
          this.frontUrl = event.url;
          break;
        case 'cover':
          this.coverUrl = event.url;
          break;
        case 'qualification':
          this.qualificationUrl = event.url;
          break;
      }
    } else {
      switch (event.type) {
        case 'logo':
          this.editLogoUrl = event.url;
          break;
        case 'cover':
          this.editCoverUrl = event.url;
          break;
        case 'qualification':
          this.editQualificationUrl = event.url;
          this.qualificationUrl = event.url;
          break;
      }
    }
  }


  async onSubmit() {
    try {
      this.submitLoading = true;
      this.isSave = true;
      if (this.isShow) {
        if (this.frontUrl === '../../../assets/img/logo/default_company_icon.png') {
          this.toasterService.pop('error', 'error', this.translate.instant('message.file_font_error'));
        }
        this.submitEnterprises();
      }
      let funcName;
      let message;
      if (_.isUndefined(this.settled.id)) {
        funcName = 'post';
        message = 'message.store_message';
      } else {
        funcName = 'put';
        message = 'message.update_message';
      }
      if (_.isUndefined(this.settled.id) && this.logoUrl === '../../../assets/img/logo/default_company_icon.png') {
        this.toasterService.pop('error', 'Error', this.translate.instant('message.file_logo_error'));
        this.submitLoading = false;
      } else if (_.isUndefined(this.settled.id) && this.coverUrl === '../../../assets/img/logo/default_company_icon.png') {
        this.toasterService.pop('error', 'Error', this.translate.instant('message.file_cover_error'));
        this.submitLoading = false;
      } else {
        let data = await this.chamberService.makeFileRequest(this.postUrl, this.settled, funcName);
        if (data.result.id) {
          await this.groups.forEach(item => {
            this.storeGroup(data.result.id, item);
          });
          await this.positions.forEach(item => {
            this.storePosition(data.result.id, item);
          })
        }
        this.logo.authToken = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
        if (_.isUndefined(this.settled.id)) {
          this.logo.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${data.result.id}/upload-logo`;
          this.cover.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${data.result.id}/upload-cover`;
          await this.logo.upload('POST');
          await this.cover.upload('POST');
        }
        if (_.isUndefined(this.settled.id) && this.qualificationUrl !== '../../../assets/img/logo/default_company_icon.png') {
          this.qualifications.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${data.result.id}/upload-qualification`;
          await this.qualifications.upload('POST');
        }

        if (!_.isUndefined(this.settled.id) && !_.isUndefined(this.editLogoUrl)) {
          this.logo.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${data.result.id}/upload-logo`;
          await this.logo.upload('POST');
        }
        if (!_.isUndefined(this.settled.id) && !_.isUndefined(this.editCoverUrl)) {
          this.cover.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${data.result.id}/upload-cover`;
          await this.cover.upload('POST');
        }
        if (!_.isUndefined(this.settled.id) && !_.isUndefined(this.editQualificationUrl)) {
          this.qualifications.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${data.result.id}/upload-qualification`;
          await this.qualifications.upload('POST');
        }
        this.toasterService.pop('success', 'Success', this.translate.instant(message));

        this.router.navigate(['/coc', 'success']);
        this.submitLoading = false;
      }
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }

  selected(event, type: string) {
    switch (type) {
      case 'industries':
        this.settled.industryId = event.id;
        break;
      case 'locations':
        this.settled.locationId = event.id;
        break;
      case 'scale':
        this.settled.scale = event.id;
        break;
    }
  }

  async submitEnterprises() {
    try {
      let response = await this.chamberSettledService.updateEnterprises(this.enterprises).toPromise();

      this.front.url = `${this.config.apiEndPoint}enterprise/enterprises/id-front`;
      await this.front.upload(`POST`);
    } catch (err) {
      this.toasterService.pop('error', 'error', err.massage);
    }
  }

  regex(email: string) {
    let regexs = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    this.isEmail = regexs.test(email) ? regexs.test(email) : false;
  }

}
