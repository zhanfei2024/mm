import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IFilter, IMeta} from "../../../../common/http/http.service";
import * as _ from "lodash";
import {ToasterService} from "angular2-toaster";
import {ModalDirective} from "ngx-bootstrap";
import {ChamberMemberService} from "../list/chamber-member.service";
import {ChamberMemberGroupService} from "../list/chamber-member-group.service";
import {SeoService} from "../../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";
import {ChamberService} from "../../chamber.service";
import {ChamberPositionService} from "../../chamber-position/chamber-position.service";
import {SelectComponent} from "ng2-select";

declare var laydate;

@Component({
  templateUrl: './chamber-member-examine.component.html',
})
export class ChamberMemberExamineComponent implements OnInit, DoCheck {
  public id: string;
  public indexId: string;
  public rows: any[] = [];
  public tableLoading: boolean;
  public submitLoading: boolean;
  public expireDate: string;
  public groupId: string;
  public code: string;
  public positionId: string;
  public iFilter: any;

  public filter: IFilter = {
    page: 1,
    limit: 6,
    status: '',
    sorting: '',
    search: '',
    groupId: '',
  };

  public groups: any[] = [];
  public activeGroups: any[] = [];
  public activePosition: any[] = [];
  public position: any[] = [];

  public meta: IMeta = {pagination: {}};
  @ViewChild('inviteModal') public inviteModal: ModalDirective;
  @ViewChild('myDate') _date: ElementRef;
  @ViewChild('gup') public activeGroupss: SelectComponent;
  @ViewChild('poson') public activesPosition: SelectComponent;


  constructor(private chamberMemberService: ChamberMemberService,
              private chamberMemberGroupService: ChamberMemberGroupService,
              private chamberPositionService: ChamberPositionService,
              private seoService: SeoService,
              private translate: TranslateService,
              private chamberService: ChamberService,
              private toasterService: ToasterService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant('chamber.left.member'), this.seoService.getTitleContent());
    this.iFilter = [
      {
        id: 'numberDESC',
        text: this.translate.instant('global.numberDESC')
      },
      {
        id: 'numberASC',
        text: this.translate.instant('global.numberASC')
      },
      {
        id: 'expireDateASC',
        text: this.translate.instant('global.expireDateASC')
      },
      {
        id: 'expireDateDESC',
        text: this.translate.instant('global.expireDateDESC')
      },
      {
        id: 'positionAsc',
        text: this.translate.instant('global.positionAsc')
      },
      {
        id: 'positionDesc',
        text: this.translate.instant('global.positionDesc')
      },
      {
        id: 'usernameAsc',
        text: this.translate.instant('global.usernameAsc')
      },
      {
        id: 'usernameDesc',
        text: this.translate.instant('global.usernameDesc')
      }
    ];
  }

  ngOnInit() {
    laydate.render({
      elem: this._date.nativeElement
      , showBottom: false
      , theme: '#0b409c'
      , lang: localStorage.getItem('lang')
      , done: (value) => {
        this.expireDate = value;
      }
    });
    this.id = localStorage.getItem('chamber');
    this.reloadTable();
    this.reloadGroup();
  }

  async changePage(event: any) {
    this.filter.page = event.page;
    await this.reloadTable();
  }

  onSearch(): void {
    this.filter.page = 1;
    this.reloadTable();
  }

  changStatus(data: any, type: string) {
    if (type === 'group') {
      this.filter.groupId = data.id;
    } else {
      this.filter.sorting = data.id;
    }
    this.reloadTable();
  }

  changGroup(type: string, data: any) {
    if (type === 'group') {
      this.groupId = data.id;

    } else {
      this.positionId = data.id;
    }
  }

  async reloadGroup(): Promise<any> {
    try {
      let data = await this.chamberMemberGroupService.get('groups', this.id, {}).toPromise();
      this.groups = this.chamberService.itemsToFomart(data.result);
      this.groups[0] = {id: ' ', text: this.translate.instant('cocShow.home.whole')};
    } catch (err) {
    }
  }

  async reloadPosition(): Promise<any> {
    try {
      let data = await this.chamberPositionService.get(this.id, {}).toPromise();
      let arr = [];
      data.result.map((item: any) => {
        arr.push({id: `${item.id}`, text: `${item.title}`})
      });
      this.position = arr;
    } catch (err) {
    }
  }

  async reloadTable() {
    try {
      this.tableLoading = true;
      let data = await this.chamberMemberService.getMember(this.id, this.filter.search === '' ? _.omit(this.filter, 'search') : this.filter).toPromise();
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

  openModel(index: string) {
    this.inviteModal.show();
    this.indexId = this.rows[index].id;
    this.expireDate = this.rows[index].expireDate;
    this.code = this.rows[index].number;
    this.activeGroupss['active'][0] = {
      id: this.rows[index]['group']['id'],
      text: this.rows[index]['group']['name']
    };
    this.activesPosition['active'][0] = {
      id: this.rows[index]['memberRating']['id'],
      text: this.rows[index]['memberRating']['title']
    };
    if(!_.isNull(this.rows[index].group)){
      this.groupId = this.rows[index].group.id;
    }
    if(!_.isNull(this.rows[index].memberRating)){
      this.positionId = this.rows[index].memberRating.id;
    }
    this.reloadPosition();
  }


  async onSubmit() {
    try {
      this.submitLoading = true;
      await this.chamberMemberService.updateMember(this.id, {
        groupId: this.groupId,
        memberId: this.indexId,
        memberRatingId: this.positionId,
        number: this.code,
        expireDate: this.expireDate
      }).toPromise();
      this.toasterService.pop('success', 'Success', this.translate.instant('message.update_message'));
      this.submitLoading = false;
      this.inviteModal.hide();
      this.reloadTable();
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }


}
