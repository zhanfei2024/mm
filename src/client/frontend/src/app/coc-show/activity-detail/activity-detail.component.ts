import {Component, OnInit, ViewChild, DoCheck} from '@angular/core';
import {CocShowService} from "../coc-show.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SeoService} from "../../../common/global/seo";
import {ModalDirective} from "ngx-bootstrap";
import {Auth} from "../../auth/auth.service";
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";
import * as _ from "lodash";
import * as moment from 'moment';
import {UserService} from "../../user/user.service";

@Component({
  templateUrl: './activity-detail.component.html'
})
export class ActivityDetailComponent implements OnInit, DoCheck {

  public tableLoading: boolean;
  public submitLoading: boolean;
  public rows: any;
  public bank: any;
  public id: string;
  public cocName: string;
  public address: string;
  public startTimedAt: string;
  public endTimedAt: string;
  public title: string = 'cocShow.activity.me_apply';
  public post: any = {
    contact: '',
    phone: '',
    email: '',
    numberOfPeople: ''
  };
  public step1: boolean = true;
  public activityTitle: string;
  @ViewChild('applyModal') public applyModal: ModalDirective;

  constructor(private activeRoute: ActivatedRoute,
              private seoService: SeoService,
              private router: Router,
              private auth: Auth,
              private userService: UserService,
              private toasterService: ToasterService,
              private transalate: TranslateService,
              private cocShowService: CocShowService) {
  }

  ngDoCheck() {
    let title = `${this.activityTitle}_${this.cocName}_${this.transalate.instant('global.coc_title')}`;
    let keyWords = `${this.activityTitle}`;
    this.seoService.setTitle(title, this.seoService.getTitleContent());
    this.seoService.setKeyWords(keyWords);
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.activeRoute.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.reloadTable(params['activityId'])
      });
  }

  async reloadTable(id: string) {
    try {
      this.tableLoading = true;
      let data = await this.cocShowService.findActivities(id, {}).toPromise();
      this.rows = data.result;
      this.tableLoading = false;
      this.activityTitle = _.isUndefined(data.result.title) ? '' : data.result.title;
      this.cocName = _.isUndefined(this.rows.coc.name) ? '' : this.rows.coc.name;
      this.address = _.isUndefined(this.rows.address) ? '' : this.rows.address;
      let startTime = _.isUndefined(this.rows.startTimedAt) ? '' : this.rows.startTimedAt;
      let endTime = _.isUndefined(this.rows.endTimedAt) ? '' : this.rows.endTimedAt;
      this.startTimedAt = moment(startTime).format("YYYY-MM-DD HH:mm");
      this.endTimedAt = moment(endTime).format("YYYY-MM-DD HH:mm");
      this.rows.signUpEndTimedAt = moment(this.rows.signUpEndTimedAt).format("YYYY-MM-DD HH:mm");
      let description = `${this.activityTitle}，
          ${this.transalate.instant('chamber.activity.sponsor')}：${this.cocName}  
          ${this.transalate.instant('chamber.activity.time')}：${this.startTimedAt} to ${this.endTimedAt} 
          ${this.transalate.instant('chamber.activity.address')}：${this.address} `;
      this.seoService.setDescription(description);
      /**
       *未登录状态
       */
      if (_.isNull(sessionStorage.getItem('role'))) {
        switch (this.rows.status) {
          case 'sign-up':
            this.title = `cocShow.activity.me_apply`;
            break;
          case 'close':
            this.title = `cocShow.home.${this.rows.status}`;
            break;
          case 'ended':
            this.title = `cocShow.home.${this.rows.status}`;
            break;
          case 'full':
            this.title = `cocShow.home.${this.rows.status}`;
            break;
          case 'in-process':
            this.title = `cocShow.home.${this.rows.status}`;
            break;
        }
      }
      /**
       *已登录
       */
      if (this.auth.isAuthenticated()) {
        this.chekIsApplay(this.rows.id);
      }
      this.seoService.setTitle(this.rows.title, this.seoService.getTitleContent());
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async getProfile(): Promise<any> {
    try {
      let data = await this.userService.getProfile().toPromise();
      this.post.contact = data.result.name;
      this.post.phone = data.result.phone;
      this.post.email = data.result.email;
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
    }
  }


  async chekIsApplay(id: string): Promise<any> {
    try {
      let data = await this.cocShowService.chekIsctivitiesApply(id).toPromise();
      this.isSign(data.status);
    } catch (err) {
    }
  }

  /**
   *已登录情况下，根据活动状态，如果还在报名中，通过后端判断用户是否报名过活动
   */
  isSign(status: string) {
    if (this.rows.status === 'sign-up') {
      switch (status) {
        case 'false':
          this.title = 'cocShow.activity.me_apply';
          break;
        case 'true':
          this.title = 'user.home.success';
          break;
        case 'applying':
          this.title = 'user.home.pending';
          break;
      }
    }
    if (this.rows.status === 'full') {
      this.title = `cocShow.home.${this.rows.status}`;
    }
    if (this.rows.status === 'in-process') {
      this.title = `cocShow.home.${this.rows.status}`;
    }
    if (this.rows.status === 'ended') {
      this.title = `cocShow.home.${this.rows.status}`;
    }
    if (this.rows.status === 'close') {
      this.title = `cocShow.home.${this.rows.status}`;
    }
  }

  /**
   *点击我要报名，弹出模态框
   */
  openModel() {
    if (this.auth.isAuthenticated() && sessionStorage.getItem('role') === 'user') {
      this.getProfile();
      this.applyModal.show();
    } else {
      this.router.navigate(['/auth/login'])
    }
  }


  /**
   *提交报名活动表单
   */
  async onSubmit() {
    try {
      this.submitLoading = true;
      let data = await this.cocShowService.storeCandidate(this.rows.id, this.post).toPromise();
      this.rows.applyNumberOfPeople = data.numberOfPeople;
      this.toasterService.pop('success', '', this.transalate.instant('message.signup_message'));
      this.step1 = false;
      this.applyModal.hide();
      this.chekIsApplay(this.rows.id);
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }

}
