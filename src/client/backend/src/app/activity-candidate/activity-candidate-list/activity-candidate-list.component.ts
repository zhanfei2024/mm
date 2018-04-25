import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';

import {ActivityCandidateService} from "../activity-candidate.service";

@Component({
  templateUrl: './activity-candidate-list.component.html',
  styleUrls: ['./activity-candidate-list.component.css']
})

export class ActivityCandidateListComponent implements OnInit, AfterViewChecked {
  tableLoading = false;
  isResetBtnDisabled = true;
  rows: any[] = [];
  meta: IMeta = {pagination: {}};

  activityItems: any[] = [
    {id: 'sign-up', text: this.translate('activity_candidate.sign-up')},
    {id: 'ended', text: this.translate('activity_candidate.ended')},
    {id: 'full', text: this.translate('activity_candidate.full')},
    {id: 'close', text: this.translate('activity_candidate.close')},
    {id: 'in-process', text: this.translate('activity_candidate.in-process')},
  ];
  statusItems: any[] = [
    {id: 'success', text: this.translate('activity_candidate.pass')},
    {id: 'pending', text: this.translate('activity_candidate.pending')},
    {id: 'fail', text: this.translate('activity_candidate.not_pass')},
  ];
  orderStatusItems: any[];
  public filter: IFilter = {
    page: 1,
    limit: 10,
    search: '',
    name: '',
    status: '',
    activityStatus: '',
    account: ''
  };

  ngAfterViewChecked() {
    this.activityItems = [
      {id: 'sign-up', text: this.translate('activity_candidate.sign-up')},
      {id: 'ended', text: this.translate('activity_candidate.ended')},
      {id: 'full', text: this.translate('activity_candidate.full')},
      {id: 'close', text: this.translate('activity_candidate.close')},
      {id: 'in-process', text: this.translate('activity_candidate.in-process')},
    ];
    this.statusItems = [
      {id: 'success', text: this.translate('activity_candidate.pass')},
      {id: 'pending', text: this.translate('activity_candidate.pending')},
      {id: 'fail', text: this.translate('activity_candidate.not_pass')},
    ];
  }

  constructor(private orderService: ActivityCandidateService,
              private toasterService: ToasterService,
              private i18nService: I18nService) {
  }

  ngOnInit() {

    this.getAllOrders();
  }


  // 获取所有订单列表
  async getAllOrders(): Promise<any> {
    try {
      const rule = this.filter;
      if (rule.status == '') delete rule.status;
      if (rule.activityStatus == '') delete rule.activityStatus;
      if (rule.account == '') delete rule.account;
      if (rule.search == '') delete rule.search;


      this.tableLoading = true;
      const data = await this.orderService.getAllOrders(rule).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async selectStatus(e) {
    this.filter.status = e.id
  }

  async selectActivityStatus(e) {
    this.filter.activityStatus = e.id
  }

  translate(str: string) {
    return this.i18nService.instant(str);
  }

  onSearch() {
    this.getAllOrders();
  }

  onReset() {
    this.filter = {
      page: 1,
      limit: 10,
      search: '',
      name: '',
      status: '',
      activityStatus: '',
      account: ''
    };
    this.getAllOrders();
  }


  onFilter() {
    this.filter.page = 1;
    this.getAllOrders();
  }

  // 切换分页
  changePage(event: any): void {
    this.filter.page = event.page;
    this.getAllOrders();
  }
}
