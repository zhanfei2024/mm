import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {AccountService} from "../account.service";

@Component({
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})

export class AccountListComponent implements OnInit {
  tableLoading = false;
  isResetBtnDisabled = true;
  row = {};
  meta: IMeta = {pagination: {}};
  @ViewChild('orderTypeSelector') public orderTypeSelector: SelectComponent;
  @ViewChild('payTypeSelector') public payTypeSelector: SelectComponent;
  @ViewChild('orderStatusSelector') public orderStatusSelector: SelectComponent;
  orderTypeItems: any[];
  payTypeItems: any[];
  orderStatusItems: any[];
  public filter = {
    oldPassword: '',
    password: '',
    verifyPassword: ''
  }



  constructor(private orderService: AccountService,
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
      const data = await this.orderService.getAllOrders().toPromise();
      this.row = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async onSubmit():Promise<any> {
    try {
      this.tableLoading = true;
      await this.orderService.update(this.filter).toPromise();
      this.tableLoading = false;
     // this.getAllOrders();
    }catch (err){
      this.tableLoading = false;
    }
  }

}
