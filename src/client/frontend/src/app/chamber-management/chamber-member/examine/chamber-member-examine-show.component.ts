import {Component, OnInit, ViewChild} from '@angular/core';
import {ChamberMemberService} from "../list/chamber-member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalDirective} from "ngx-bootstrap";
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";
import * as _ from "lodash";
import {CocShowService} from "../../../coc-show/coc-show.service";
import {ChamberMemberGroupService} from "../list/chamber-member-group.service";
import {SelectComponent} from "ng2-select";


@Component({
  templateUrl: './chamber-member-examine-show.component.html',
})
export class ChamberMemberExamineShowComponent implements OnInit {
  public tableLoading: boolean;
  public submitLoading: boolean;
  public id: string;
  public rows: any;
  public isMember: any;
  public backgroundImg: string;
  public groups: any[] = [];
  public positions: any[] = [];
  public selectGroups: any[];
  public selectPositions: any[];
  public activeGroup: any[] = [];
  public activePosition: any[] = [];
  public update: any = {
    candidateId: '',
    status: '',
    cocId: '',
    type: 'appliy',
    phone: '',
    content: '',
    groupId: '',
    positionId: ''
  };
  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('group') public activeGroupss: SelectComponent;
  @ViewChild('position') public activesPosition: SelectComponent;
  @ViewChild('inviteModal') public inviteModal: ModalDirective;

  constructor(private chamberMemberService: ChamberMemberService,
              private toasterService: ToasterService,
              private activeRouter: ActivatedRoute,
              private translate: TranslateService,
              private cocShowService: CocShowService,
              private chamberMemberGroupService: ChamberMemberGroupService,
              private router: Router) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.getPositions(this.id);
    this.getGroups(this.id);
    this.activeRouter.params.subscribe((params) => {
      this.update.candidateId = params['id'];
      if (location.hash === `#/chamber/${this.id}/member/${params['id']}/show`) {
        this.reloadMember(params['id']);
        this.isMember = true;

      } else {
        this.reloadTable(params['id']);
        this.isMember = false;
      }
    });
  }

  /**
   *获取职务
   */
  async getPositions(id: string) {
    try {
      let data = await this.chamberMemberGroupService.get('member_ratings', id).toPromise();
      data.result.forEach(item => {
        this.positions.push({
          id: item.id,
          text: item.title
        })
      });
      this.selectPositions = this.positions;
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message)
    }
  }

  /**
   *获取会籍
   */
  async getGroups(id: string) {
    try {
      let data = await this.cocShowService.getGroup(id).toPromise();
      data.result.forEach(item => {
        this.groups.push({
          id: item.id,
          text: item.name
        })
      })
      this.selectGroups = this.groups;
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message)
    }
  }

  selected($event: any, status: string): void {
    switch (status) {
      case 'groups':
        this.update.groupId = $event.id;
        break;
      case 'position':
        this.update.positionId = $event.id;
        break;
    }
  }

  async reloadMember(id: string) {
    try {
      this.tableLoading = true;
      let data = await this.chamberMemberService.getFindMember(this.id, id).toPromise();
      this.rows = data.result;
      this.backgroundImg = `url(${this.rows.user.userProfile.avatar})`;
      if (!_.isUndefined(this.rows.user.userCompany)) {
        _.each(this.rows.user.userCompany, (value) => {
          value.businessNo = JSON.parse(value.businessNo);
        });
      }
      this.update.cocId = this.rows.coc.id;
      this.update.phone = this.rows.phone;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async reloadTable(id: string) {

    try {
      this.tableLoading = true;
      let data = await this.chamberMemberService.getFind(this.id, id).toPromise();
      this.rows = data.result;
      this.update.cocId = this.rows.coc.id;
      this.update.phone = this.rows.phone;
      this.activeGroupss['active'][0] = {
        id: this.rows['group']['id'],
        text: this.rows['group']['name']
      };
      this.activesPosition['active'][0] = {
        id: this.rows['memberRating']['id'],
        text: this.rows['memberRating']['title']
      };
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async updateStatus() {
    try {
      this.submitLoading = true;
      await this.chamberMemberService.update(localStorage.getItem('chamber'), this.update).toPromise();
      this.toasterService.pop('success', 'Success', this.translate.instant('message.examine_message'));
      this.inviteModal.show();
      this.router.navigate(['/chamber', localStorage.getItem('chamber'), 'member', 'list']);
      this.submitLoading = false;
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }


  open(status: string) {
    if (status === 'success') {
      this.update.status = status;
      this.updateStatus();
    } else {
      this.update.status = status;
      this.editModal.show();
    }
  }

}
