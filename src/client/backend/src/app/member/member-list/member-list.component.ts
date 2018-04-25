import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {MemberService} from "../member.service";

@Component({
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  tableLoading = false;
  isResetBtnDisabled = true;
  rows: any[] = [];
  meta: IMeta = {pagination: {}};
  @ViewChild('orderTypeSelector') public orderTypeSelector: SelectComponent;
  @ViewChild('payTypeSelector') public payTypeSelector: SelectComponent;
  @ViewChild('orderStatusSelector') public orderStatusSelector: SelectComponent;
  orderTypeItems: any[];
  payTypeItems: any[];
  orderStatusItems: any[];
  public filter: IFilter = {
    page: 1,
    limit: 10,
    search: '',
    name: '',
  };


  constructor(private orderService: MemberService,
              private toasterService: ToasterService,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.getAllOrders();
  }


  // 获取会员列表
  async getAllOrders(): Promise<any> {
    try {
      this.tableLoading = true;
      const data = await this.orderService.getAllOrders(this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  // 删除会员
  async deleteMember(data: any): Promise<any> {
    try {
      await this.orderService.delete(data).toPromise();
      this.getAllOrders();
    } catch (err) {
      this.tableLoading = false;
    }
  }


   onSearch(search?: string) {
    this.filter.search = search;
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
