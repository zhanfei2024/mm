import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {UserService, Invitation, Activity} from "../user.service";
import {ToasterService} from "angular2-toaster";
import {IFilter} from "../../../common/http/http.service";
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";
import * as _ from "lodash";

@Component({
  templateUrl: './user-home.component.html'
})

export class UserHomeComponent implements OnInit, AfterViewChecked {
  public filter: IFilter = {
    page: 1,
    limit: 5,
    sorting: '',
    search: '',
  };
  public invitations: Invitation[];
  public invitationsEmpty: boolean;
  public applyinvitations: Invitation[];
  public activities: Activity[];
  public announcements: any[] = [];
  public invitationsLoading: boolean;
  public applyinvitationsLoading: boolean;
  public activitiesLoading: boolean;
  public announcementsLoading: boolean;
  public accpet: any = {status: 'success'};
  public reject: any = {status: 'fail'};
  public userId: string;

  constructor(private user: UserService,
              private toasterService: ToasterService,
              private seoService: SeoService,
              private translateService: TranslateService) {
  }

  ngAfterViewChecked() {
    this.seoService.setTitle(this.translateService.instant('user.navbar.personal_home_page'), this.seoService.getTitleContent());
  }

  ngOnInit() {
    this.getInvitation();
    this.getCocApplies();
    this.getActivityApplies();
    this.userId = localStorage.getItem('userId');
  }

  /**
   *商会邀请列表
   */
  async getInvitation(): Promise<any> {
    try {
      this.invitationsLoading = true;
      this.filter['order'] = 'inviteDESC';
      let data = await this.user.getInvitations(this.filter).toPromise();
      this.invitationsLoading = false;
      this.invitations = data.result;
      this.invitationsEmpty = _.isNull(this.invitations);
    } catch (err) {
      this.invitationsLoading = false;
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  /**
   *接受或拒绝邀请
   */
  async Invitations(data: any, state: string): Promise<any> {
    switch (state) {
      case 'success':
        try {
          this.accpet.introducer = data.introducer;
          await this.user.reponseInvitations(data.id, this.accpet).toPromise();
          this.getInvitation()
          this.toasterService.pop('success', 'success', this.translateService.instant('user.home.already-accept'));
        } catch (err) {
          this.toasterService.pop('err', 'Error', err.message);
        }
        break;
      case 'fail':
        try {
          this.reject.introducer = data.introducer;
          await this.user.reponseInvitations(data.introducer, this.reject).toPromise();
          this.getInvitation()
          this.toasterService.pop('success', 'success', this.translateService.instant('user.home.already-refuse'));
        } catch (err) {
          this.toasterService.pop('err', 'Error', err.message);
        }
        break;
    }
  }

  /**
   *商会申请列表
   */
  async getCocApplies(): Promise<any> {
    try {
      this.applyinvitationsLoading = true;
      this.filter['order'] = 'applyDESC';
      let data = await this.user.getCocApplies(this.filter).toPromise();
      this.applyinvitationsLoading = false;
      this.applyinvitations = data.result.filter(item => item.type === 'appliy' && item.status !== 'success');
      let result = data.result.filter(item => item.status === 'success');
      if (result.length > 0) {
        this.getAnnouncements(result[0].cocId);
      }
    } catch (err) {
      this.applyinvitationsLoading = false;
      this.toasterService.pop('error', 'Error', err.message);
    }
  }

  /**
   *活动申请列表
   */
  async getActivityApplies(): Promise<any> {
    try {
      this.activitiesLoading = true;
      let data = await this.user.getActivityApplies(this.filter).toPromise();
      this.activitiesLoading = false;
      this.activities = data.result;
    } catch (err) {
      this.activitiesLoading = false;
      this.toasterService.pop('error', 'Error', err.message);
    }
  }

  //活动商会公告
  async getAnnouncements(id: string): Promise<any> {
    try {
      this.announcementsLoading = true;
      let data = await this.user.getAnnouncements(id, {cocId: id, limit: 3}).toPromise();
      this.announcementsLoading = false;
      this.announcements = data.result;
    } catch (err) {
      this.announcementsLoading = false;
      this.toasterService.pop('error', 'Error', err.message);
    }
  }
}
