import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {ActivityCategoryService , AddCategory} from "../activity-category.service";
import {ModalDirective} from "ngx-bootstrap";


@Component({
  templateUrl: './activity-category-list.component.html',
  styleUrls: ['./activity-category-list.component.css']
})

export class ActivityCategoryListComponent implements OnInit {
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
  // 模态框相关
  public isInitModal = false;
  public funcName: string;
  public message: string;
  public addcategory: AddCategory  = new AddCategory();
  @ViewChild('editModal') public editModal: ModalDirective;


  constructor(private orderService: ActivityCategoryService,
              private toasterService: ToasterService,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.getAllOrders();
  }

  async getAllOrders(): Promise<any> {
    try {
      this.tableLoading = true;
      const data = await this.orderService.getAllOrders(this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
      this.toasterService.pop('error', err);
    }
  }
  // 删除活动种类
  async deleteCategory(data: any): Promise<any> {
    try {
      this.tableLoading = true;
      await this.orderService.delete(data).toPromise();
      this.getAllOrders();
    } catch (err) {
      this.tableLoading = false;
      this.toasterService.pop('error', err);
    }
  }

  openModal(data?: any) {
    if (!_.isUndefined(data)) {
      this.addcategory = data;
      this.funcName = 'update';
      this.editModal.show();
    } else {
      this.addcategory = new AddCategory();
      this.funcName = 'store';
      this.editModal.show();
    }
    this.isInitModal = true;
  }

  // 创建
  async onSubmit(): Promise<any> {
    try {
      if (this.funcName === 'update') {
        this.message = 'panel.message.update_message';
      } else {
        this.message = 'panel.message.store_message';
      }
      await this.orderService[this.funcName](this.addcategory).toPromise();
      this.getAllOrders();
      this.editModal.hide();
      this.toasterService.pop('success', '');
    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
    }
  }

  async switchEnable(data: any): Promise<any> {
    try {
      this.tableLoading = true;
      const val = {
        id: data.id,
        isActive: data.isActive
      };
      await this.orderService.update(val).toPromise();
      await this.getAllOrders();

      this.tableLoading = false;

    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
      this.tableLoading = false;
    }
  }

  closeModal(modal) {
    modal.hide();
    this.isInitModal = false;
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
