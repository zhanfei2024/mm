import {Component, OnInit, ViewChild, DoCheck} from '@angular/core';
import {Location} from "@angular/common";
import {CocShowService, CocNotice} from "../coc-show.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SeoService} from "../../../common/global/seo";
import {ModalDirective} from "ngx-bootstrap";
import {Auth} from "../../auth/auth.service";
import {ToasterService} from "angular2-toaster";
import * as _ from "lodash";
import {Subscription} from 'rxjs/Subscription';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './notice-detail.component.html'
})
export class NoticeDetailComponent implements OnInit, DoCheck {

  public cocNoticeDetail: CocNotice;
  public noticeDetailLoading: boolean;
  public title: string = 'cocShow.navbar.apply_into_coc';
  private cocId: string;
  public userId: string;
  public authority: number;
  public cocNoticeTitle: string;
  public bank: any[] = [];
  public cocNoticeEmpty: boolean;
  public bankItem: any;
  public groupId: string;
  public bankId: string;
  public step1: boolean = true;
  public groups: any;
  public statement1: boolean;
  public statement2: boolean;
  public statement3: boolean;
  public subscription: Subscription;
  public cocName: string;
  public content: string;
  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private location: Location,
              private cocShowService: CocShowService,
              private route: ActivatedRoute,
              private router: Router,
              private seoService: SeoService,
              private toasterService: ToasterService,
              private translateService: TranslateService,
              private auth: Auth) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cocId = localStorage.getItem('cocId');
    this.userId = localStorage.getItem('userId');
    /**
     *获取路由参数id,调用方法
     */
    this.route.params.subscribe(
      (params) => {
        this.findMemberNoticeDetail(this.cocId, params['noticeId']);
      }
    );
    this.chekIsApplay(this.cocId);
  }

  ngDoCheck() {
    if (this.authority === 17004) {
      this.seoService.setTitle(this.translateService.instant('global.no_account'), this.seoService.getTitleContent());
    } else {
      let title = `${this.cocNoticeTitle}_${this.cocName}_${this.translateService.instant('global.coc_title')}`;
      let keyWords = `${this.cocNoticeTitle}`;
      let description = `${this.content}`;
      this.seoService.setTitle(title, this.seoService.getTitleContent());
      this.seoService.setKeyWords(keyWords);
      this.seoService.setDescription(description);
    }
  }

  /**
   *获取商会公告详情
   */
  async findMemberNoticeDetail(cocId: string, announcementId: string): Promise<any> {
    try {
      this.noticeDetailLoading = true;
      let data = await this.cocShowService.findMemberNoticeDetail(cocId, announcementId).toPromise();
      this.cocNoticeDetail = data.result;
      this.cocNoticeEmpty = _.isNull(this.cocNoticeDetail);
      this.cocNoticeTitle = data.result.title;
      this.cocName = this.cocNoticeDetail.coc.name;
      this.authority = 0;
      this.noticeDetailLoading = false;
      this.content = this.cocNoticeDetail.content.replace(/[<][^>]+[>]/g, '').slice(0, 120);
    } catch (err) {
      // this.toasterService.pop('warning', 'warning', err.message);

      this.noticeDetailLoading = false;
      this.authority = err.code;
      if (this.authority === 11000) {
        this.toasterService.pop('warning', 'warning',this.translateService.instant('auth.must_login'));
        this.router.navigate(['/auth', 'login']);
        localStorage.setItem('isBack', 'true');
      }
    }
  }

  /**
   *获取商会组织架构
   */
  async reloadGroup(id: string) {
    try {
      let data = await this.cocShowService.getGroup(id, {}).toPromise();
      this.groups = data.result;
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *获取银行账号
   */
  async reloadBank(id: string) {
    try {
      let data = await this.cocShowService.getBank(id, {}).toPromise();
      this.bank = data.result;
      this.bankItem = data.result[0];
      this.bankId = data.result[0].id;
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *查询用户是否申请过商会
   */
  async chekIsApplay(id: string): Promise<any> {
    try {
      let data = await this.cocShowService.chekIsApply(id).toPromise();
      switch (data.status) {
        case 'false':
          this.title = 'cocShow.navbar.apply_into_coc';
          break;
        case 'true':
          this.title = 'cocShow.navbar.apply_coc';
          break;
        case 'applying':
          this.title = 'cocShow.navbar.pending_coc';
          break;
        case 'invited':
          this.title = 'cocShow.navbar.invited_coc';
          break;
      }

    } catch (err) {
    }
  }

  /**
   *后退
   */
  back(): void {
    this.location.back();
  }

  /**
   *切换
   */
  next() {
    this.step1 = !this.step1;
  }

  /**
   *选择职位
   */
  selected(data: any, group: string) {
    if (group === 'group') {
      this.groupId = data.id;
    } else {
      this.bankId = data.id;
      this.bankItem = data;
    }
  }

  /**
   *提交申请表单
   */
  async onSubmit() {
    try {
      await this.cocShowService.applyCoc(this.cocId, {
        groupId: this.groupId,
        statement1: this.statement1,
        statement2: this.statement2,
        statement3: this.statement3
      }).toPromise();
      this.toasterService.pop('success', 'success', 'success');
      this.step1 = false;
    } catch (err) {
      this.toasterService.pop('error', 'error', err.message);
    }
  }

  link() {
    this.editModal.hide();
    this.chekIsApplay(this.cocId);
  }

  /**
   *显示申请表单
   */
  openModel() {
    if (this.auth.isAuthenticated() && sessionStorage.getItem('role') === 'user') {
      this.editModal.show();
      this.reloadGroup(this.cocId);
      this.reloadBank(this.cocId);
    } else {
      this.router.navigate(['/auth/login']);
      localStorage.setItem('isBack', 'true');
    }
  }
}
