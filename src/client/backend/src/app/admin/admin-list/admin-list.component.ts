import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {AdminService, Admin} from "../admin.service";
import {ModalDirective} from "ngx-bootstrap";
import {noUndefined} from "@angular/compiler/src/util";
import {DialogService} from '../../../common/dialog/dialog.service';

@Component({
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})

export class AdminListComponent implements OnInit {
  tableLoading = false;
  isResetBtnDisabled = true;
  public isInitModal: boolean = false;
  public message = {};
  rows: any[] = [];
  meta: IMeta = {pagination: {}};
  @ViewChild('orderTypeSelector') public orderTypeSelector: SelectComponent;
  @ViewChild('payTypeSelector') public payTypeSelector: SelectComponent;
  @ViewChild('orderStatusSelector') public orderStatusSelector: SelectComponent;
  orderTypeItems: any[];
  payTypeItems: any[];
  orderStatusItems: any[];
  selector = false;
  public filter: IFilter = {
    page: 1,
    limit: 10,
    search: '',
    name: '',
  };
  public admin_data: Admin = new Admin();

  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private orderService: AdminService,
              private toasterService: ToasterService,
              private dialogService: DialogService,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.getAllOrders();
  }


  // 获取管理员列表
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
  // 删除管理员
  async deleteAdmin(data: any): Promise<any> {
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

  async onSubmit(data: any): Promise<any> {
    await this.orderService.onSubmit(this.admin_data).toPromise();
    this.getAllOrders();
  }

  async onUpdate(data: any): Promise<any> {
    await this.orderService.onUpdate(this.admin_data).toPromise();
    this.getAllOrders();

  }


  openModal(data?: any) {
    if (_.isNil(data)) {
      this.selector = true;
    }
    else {
      this.selector = false;
      this.admin_data.id = data.id;
      this.admin_data.name = data.name;
      this.admin_data.email = data.email;
      this.admin_data.password = data.password;
      this.admin_data.remark = data.remark;
    }
    this.isInitModal = true;
    this.editModal.show();
  }

  async switchEnable(data: any) {
    await this.orderService.onUpdate(data).toPromise();
  }

  onSelect(data: any) {
    if (this.selector) this.onSubmit(data);
    else this.onUpdate(data);
  }

  closeModal(modal) {
    modal.hide();
    this.admin_data.name = '';
    this.admin_data.email = '';
    this.admin_data.password = '';
    this.isInitModal = false;
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
