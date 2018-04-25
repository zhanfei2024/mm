import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {UsersService} from "../users.service";

@Component({
  templateUrl: './invtation-list.component.html',
  styleUrls: ['./invtation-list.component.css']
})

export class InvtationListComponent implements OnInit {
  tableLoading = false;
  isResetBtnDisabled = true;
  rows: any[] = [];
  meta: IMeta = {pagination: {}};
  orderTypeItems: any[];
  payTypeItems: any[];
  orderStatusItems: any[];
  public filter: IFilter = {
    page: 1,
    limit: 10,
    sorting: '',
    isTakeOut: '',
    payTypeId: '',
    financialStatus: '',
  };

  constructor(private orderService: UsersService,
              private toasterService: ToasterService,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.getAllOrders();
  }


  // 获取所有订单列表
  async getAllOrders(): Promise<any> {
    try {
      this.tableLoading = true;
      const data = await this.orderService.getInvitations(this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
      this.toasterService.pop('error', this.i18nService.instant('panel.message.error'), err);
    }
  }


  // 重置筛选条件为初始状态
  reset(): void {
    this.filter.cocName = '';
    this.filter.name = '';
    this.filter.account = '';
    this.getAllOrders();
  }

  search() {
    this.getAllOrders();
  }


  // 切换分页
  changePage(event: any): void {
    this.filter.page = event.page;
    this.getAllOrders();
  }
}
