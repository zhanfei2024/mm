import {Component, OnInit, ViewChild} from '@angular/core';
import {
  CocNotice, CocShowService,
  Massages
} from "../coc-show.service";
import {ToasterService} from "angular2-toaster";
import {IFilter, IMeta} from "../../../common/http/http.service";
import * as _ from "lodash"
import {TranslateService} from "@ngx-translate/core";
import {ModalDirective} from "ngx-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notice-announcement',
  templateUrl: './notice-announcement.component.html'
})
export class NoticeAnnouncementComponent implements OnInit {
  public filter: IFilter = {
    page: 1,
    limit: 5,
    sorting: '',
    search: '',
  };
  public memberNoticeMeta: IMeta = {pagination: {}};
  public cocNoticeMeta: IMeta = {pagination: {}};
  public memberNotice: CocNotice[];
  public cocNotice: CocNotice[];
  public cocNoticePage = 1;
  public memberNoticePage = 1;
  public cocId: string;
  public memberNoticeLoading: boolean;
  public sumbitLoading: boolean;
  public cocNoticeLoading: boolean;
  public isLogin: boolean;
  public meassge: any;
  @ViewChild('inviteModal') inviteModal: ModalDirective;


  constructor(private cocShowService: CocShowService,
              public translate: TranslateService,
              public router: Router,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.meassge = new Massages();
    this.cocId = localStorage.getItem('cocId');
    this.getCocNotice(this.cocId);
    this.getMemberNotice(this.cocId);
    this.meassge.cocId = this.cocId;
    if (sessionStorage.getItem('role') === 'user') {
      this.isLogin = true;
    }
  }


  /**
   *返回
   */
  async back(category: string) {
    switch (category) {
      case 'cocNotice':
        this.cocNoticePage--;
        await this.getCocNotice(this.cocId);
        break;
      case 'memberNotice':
        this.memberNoticePage--;
        await this.getMemberNotice(this.cocId);
        break;
    }
  }

  /**
   *获取商会入会须知列表
   */
  async getMemberNotice(id: string): Promise<any> {
    try {
      this.memberNoticeLoading = true;
      this.filter.page = this.cocNoticePage;
      this.filter['type'] = 'notice';
      let data = await this.cocShowService.findMemberNotice(id,
        this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.memberNotice = data.result;
      this.memberNoticeMeta = data.meta;
      this.memberNoticeLoading = false;
    } catch (err) {
      this.memberNoticeLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *获取商会公告列表
   */
  async getCocNotice(id: string): Promise<any> {
    try {
      this.cocNoticeLoading = true;
      this.filter.page = this.cocNoticePage;
      let data = await this.cocShowService.findCocNotice(id, this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.cocNotice = data.result;
      this.cocNoticeMeta = data.meta;
      this.cocNoticeLoading = false;
    } catch (err) {
      this.cocNoticeLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  async onSubmit(): Promise<any> {
    try {
      this.sumbitLoading = true;
      await this.cocShowService.replyMessage(this.meassge).toPromise();
      this.sumbitLoading = false;
      this.toasterService.pop('success', 'success', this.translate.instant('message.store_message'));
      this.inviteModal.hide();
    } catch (err) {
      this.sumbitLoading = false;
      let message = !_.isUndefined(err.message[`${localStorage.getItem('lang')}`]) ? err.message[`${localStorage.getItem('lang')}`] : err.message;
      this.toasterService.pop('error', 'error', message);
    }
  }

  openModel() {
    if (this.isLogin) {
      this.inviteModal.show();
    } else {
      this.router.navigate(['/auth', 'login']);
    }
  }
}
