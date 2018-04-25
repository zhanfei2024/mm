import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {IFilter, IMeta} from "../../../../common/http/http.service";
import {ChamberMemberService, IGroups, Member} from "./chamber-member.service";
import * as _ from "lodash";
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";
import {ChamberMemberGroupService} from "./chamber-member-group.service";
import {DialogService} from "../../../../common/dialog/dialog.service";
import {ModalDirective} from "ngx-bootstrap";
import {ChamberService} from "../../chamber.service";
import {SeoService} from "../../../../common/global/seo";

@Component({
  templateUrl: './chamber-member-list.component.html',
})
export class ChamberMemberListComponent implements OnInit, DoCheck {
  public id: string;
  public rows: any[] = [];
  public tableLoading: boolean;
  public submitLoading: boolean;
  public invitationsLoading: boolean;
  public invitations: Member = new Member();
  public filter: IFilter = {
    page: 1,
    limit: 6,
    isPublic: true,
    status: '',
    search: '',
  };
  public status: any[];

  public groups: IGroups[] = [];
  public times: any[] = [];
  public selectGroups: IGroups[] = [];
  public selectPosition: any[] = [];

  public meta: IMeta = {pagination: {}};
  @ViewChild('inviteModal') public inviteModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private chamberMemberService: ChamberMemberService,
              private toasterService: ToasterService,
              private dialogService: DialogService,
              private chamberService: ChamberService,
              private seoService: SeoService,
              private chamberMemberGroupService: ChamberMemberGroupService,
              private translate: TranslateService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant(this.translate.instant('chamber.left.examine')), this.seoService.getTitleContent());
    this.status = [
      {id: ' ', text: this.translate.instant('cocShow.home.whole')},
      {id: 'pending', text: this.translate.instant('global.pending')},
      {id: 'success', text: this.translate.instant('global.success')},
      {id: 'fail', text: this.translate.instant('global.fail')},
    ];
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
    ]
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.reloadTable();
    this.reloadGroup();
    this.getPositions()

  }

  async changePage(event: any) {
    this.filter.page = event.page;
    await this.reloadTable();
  }

  onSearch(): void {
    this.filter.page = 1;
    this.reloadTable();
  }

  changStatus(data: any) {
    this.filter.status = data.id;
    this.reloadTable();
  }

  changTimes(index: any, data: any) {
    this.groups[index].timeSpan = _.toNumber(data.id);
    this.groups[index].isForever = false;
  }


  async reloadTable() {
    try {
      this.tableLoading = true;
      let data = await this.chamberMemberService.get(this.id, this.filter.search === '' ? _.omit(this.filter, 'search') : this.filter).toPromise();
      this.rows = data.result;
      _.forEach(this.rows, (value) => {
        if (!_.isNil(value.user)) {
          _.forEach(value.user.userCompany, (val) => {
            if (val.isDefault) {
              value.user.userProfile.name = val.companyName;
            }
          });
        }
      });
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async reloadGroup() {
    try {
      let data = await this.chamberMemberGroupService.get('groups', this.id, {}).toPromise();
      this.selectGroups = this.chamberService.itemsToFomart(data.result);
      this.groups = _.sortBy(data.result, ['order']);
      let arr = [];
      _.each(this.groups, (value) => {
        if (!value.isForever && value.timeSpan !== 0) {
          arr[0] = {id: value.timeSpan, text: value.timeSpan}
          value['active'] = arr;
        } else {
          value['deleted'] = true;
        }
      });
    } catch (err) {
    }
  }

  async getPositions() {
    try {
      let data = await this.chamberMemberGroupService.get('member_ratings', this.id, {}).toPromise();
      this.selectPosition = data.result.map(item => {
        return {
          id: item.id,
          text: item.title
        }
      });
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message)
    }
  }

  addGroup(isForever: boolean) {
    if (isForever) {
      this.groups.push({name: '', balance: '', deleted: true, order: '', timeSpan: 0, isForever: true});
    } else {
      this.groups.push({name: '', balance: '', deleted: false, order: '', timeSpan: 0, isForever: false});
    }
  }

  deleteGroup(index: number) {
    if (this.groups[index].id !== "") {
      this.deleteGroups(this.groups[index].id);
      this.groups.splice(index, 1);
    } else {
      this.groups.splice(index, 1);
    }
  }

  onSubmitGroups() {
    _.each(this.groups, (value) => {
      if (value.name !== '' && _.isUndefined(value.id)) {
        this.onSubmitGroup(value);
        this.editModal.hide();
      }
      if (value.name !== '' && !_.isUndefined(value.id)) {
        this.onUpdateGroup(value);
        this.editModal.hide();
      }
    });
  }


  async onSubmitGroup(data: any) {
    try {
      this.submitLoading = true;
      await this.chamberMemberGroupService.store(this.id, data).toPromise();
      this.toasterService.pop('success', 'Success', this.translate.instant('message.store_message'));
      this.submitLoading = false;
    } catch (err) {
      this.toasterService.pop('error', 'error', err.message);
      this.submitLoading = false;
    }
  }


  async onUpdateGroup(data: any) {
    try {
      this.submitLoading = true;
      await this.chamberMemberGroupService.update(this.id, data).toPromise();
      this.toasterService.pop('success', 'Success', this.translate.instant('message.update_message'));
      this.submitLoading = false;
    } catch (err) {
      this.toasterService.pop('error', 'error', err.message);
      this.submitLoading = false;
    }
  }

  async deleteGroups(id: string): Promise<any> {
    try {
      const confirmed = await this.dialogService.confirm('confirm delete?');
      if (confirmed) {
        await this.chamberMemberGroupService.delete(this.id, id).toPromise();
        this.toasterService.pop('success', '', this.translate.instant('message.delete_success'));
      }
    } catch (err) {

    }
  }

  selected(event: any, item: string) {
    switch (item) {
      case 'position':
        this.invitations['memberRatingId'] = event.id;
        break;
      case 'groups':
        this.invitations['groupId'] = event.id;
        break;
    }

  }

  async onSubmitInvitations(data?: any) {
    try {
      this.invitationsLoading = true;
      if (!_.isUndefined(data)) {
        data.statement1 = true;
        data.statement2 = true;
        data.statement3 = true;
        this.invitations = data;
        this.invitations['groupId'] = data.group['id'];
      }
      this.invitations.cocId = this.id;
      await this.chamberMemberService.store(this.id, this.invitations).toPromise();
      this.toasterService.pop('success', 'Success', this.translate.instant('message.store_message'));
      this.invitationsLoading = false;
      this.inviteModal.hide();
      this.reloadTable();
    } catch (err) {
      this.invitationsLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }


}
