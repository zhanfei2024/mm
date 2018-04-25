import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {CandidateService} from "../candidate.service";
import {DialogService} from '../../../common/dialog/dialog.service';

@Component({
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})

export class CandidateListComponent implements OnInit {
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
  };

  constructor(private orderService: CandidateService,
              private toasterService: ToasterService,
              private dialogService: DialogService,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.transformStr();
    this.i18nService.translate.onLangChange.subscribe(() => {
      this.transformStr();
      this.transformSelectedItem(this.orderTypeSelector, this.orderTypeItems);
      this.transformSelectedItem(this.payTypeSelector, this.payTypeItems);
      this.transformSelectedItem(this.orderStatusSelector, this.orderStatusItems);
    });
    this.getAllOrders();
  }

  // 翻译下拉框候选项
  transformStr() {
    this.orderTypeItems = [
      {id: 'takeOut', text: this.translate('order.types.take_out')},
      {id: 'eatIn', text: this.translate('order.types.eat_in')},
      {id: 'All', text: this.translate('order.types.All')}
    ];
    this.payTypeItems = [
      {id: '1', text: this.translate('order.pay_types.cash')},
      {id: '2', text: this.translate('order.pay_types.tenpay')},
      {id: '3', text: this.translate('order.pay_types.alipay')},
      {id: '4', text: this.translate('order.pay_types.unionpay')},
      {id: '5', text: this.translate('order.pay_types.octopus')},
      {id: 'All', text: this.translate('order.pay_types.All')},
    ];
    this.orderStatusItems = [
      {id: 'pending', text: this.translate('order.status.pending')},
      {id: 'paid', text: this.translate('order.status.paid')},
      {id: 'authorized', text: this.translate('order.status.authorized')},
      {id: 'partially_paid', text: this.translate('order.status.partially_paid')},
      {id: 'partially_refunded', text: this.translate('order.status.partially_refunded')},
      {id: 'refunded', text: this.translate('order.status.refunded')},
      {id: 'voided', text: this.translate('order.status.voided')},
      {id: 'All', text: this.translate('order.status.All')}
    ]
  }

  // 翻译下拉框选中项
  transformSelectedItem(selector: SelectComponent, selectorItems: Array<any>) {
    if (selector.active.length !== 0) {
      selector.active = _.filter(selectorItems, (item: any) => {
        return selector.active[0].id === item.id;
      });
    }
  }

  translate(str: string) {
    return this.i18nService.instant(str);
  }

  // 获取所有订单列表
  async getAllOrders(): Promise<any> {
    try {
      this.tableLoading = true;
      const data = await this.orderService.getAllOrders(this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
      this.toasterService.pop('error', this.translate('panel.message.error'), err);
    }
  }

  // 删除活动报名审核
  async deleteCandidate(data: any): Promise<any> {
    try {
      this.tableLoading = true;
      const confirmed = await this.dialogService.confirm('confirm delete?');
      if (confirmed) {
        this.tableLoading = true;
        await this.orderService.delete(data).toPromise();
        this.toasterService.pop('success', '', '删除成功');
      }
      if (this.rows.length === 1 && this.filter.page - 1 > 0) {
        this.filter.page -= 1;
      }
      this.getAllOrders();
    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
      this.tableLoading = false;
    }
  }


  // 按订单类型筛选
  selectOrderType(event: any) {
    const oldVal = this.filter.isTakeOut;
    if (event.length === 0 || event.id === 'All') {
      this.filter.isTakeOut = '';
      this.isResetBtnDisabled = true;
    } else {
      this.filter.isTakeOut = event.id === 'takeOut';
      this.isResetBtnDisabled = false;
    }
    if (this.filter.isTakeOut !== oldVal) {
      this.onFilter();
    }
  }

  // 按支付方式筛选
  selectPayType(event: any) {
    const oldVal = this.filter.payTypeId;
    if (event.length === 0 || event.id === 'All') {
      this.filter.payTypeId = '';
      this.isResetBtnDisabled = true;
    } else {
      this.filter.payTypeId = event.id;
      this.isResetBtnDisabled = false;
    }
    if (this.filter.payTypeId !== oldVal) {
      this.onFilter();
    }
  }

  // 按订单状态筛选
  selectOrderStatus(event: any) {
    const oldVal = this.filter.financialStatus;
    if (event.length === 0 || event.id === 'All') {
      this.filter.financialStatus = '';
      this.isResetBtnDisabled = true;
    } else {
      this.filter.financialStatus = event.id;
      this.isResetBtnDisabled = false;
    }
    if (this.filter.financialStatus !== oldVal) {
      this.onFilter();
    }
  }

  // 重置筛选条件为初始状态
  reset(): void {
    this.filter.isTakeOut = '';
    this.filter.payTypeId = '';
    this.filter.financialStatus = '';
    this.orderTypeSelector.active = [];
    this.payTypeSelector.active = [];
    this.orderStatusSelector.active = [];
    this.isResetBtnDisabled = true;
    this.onFilter();
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
