import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {MessageService} from "../message.service";
import {ModalDirective} from "ngx-bootstrap";
import {DialogService} from '../../../common/dialog/dialog.service';

@Component({
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {
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
  public filter: IFilter = {
    page: 1,
    limit: 10,
    search: '',
    name: '',
  };

  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private orderService: MessageService,
              private toasterService: ToasterService,
              private dialogService: DialogService,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.getAllOrders();
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
    }
  }

  // 删除留言
  async deleteMessage(data: any): Promise<any> {
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


  openModal(data?: any) {
    this.message = data;
    this.isInitModal = true;
    this.editModal.show();
  }

  closeModal(modal) {
    modal.hide();
    this.isInitModal = false;
  }


  onSearch(search?: string) {
    this.getAllOrders();
  }

  onReset(search?: string) {
    this.filter.cocName = '';
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
