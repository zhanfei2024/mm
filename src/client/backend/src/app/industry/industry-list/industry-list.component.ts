import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {AddIndustry, IndustryService} from "../industry.service";
import {ModalDirective} from "ngx-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {DialogService} from "../../../../../frontend/src/common/dialog/dialog.service";

@Component({
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css'],
  providers: [DialogService]
})

export class IndustryListComponent implements OnInit {
  tableLoading = false;
  isResetBtnDisabled = true;
  rows: any[] = [];
  meta: IMeta = {pagination: {}};
  public isInitModal: boolean = false;
  public funcName: string;
  public message: string;
  public addIndustry: AddIndustry = new AddIndustry();

  public filter: IFilter = {
    page: 1,
    limit: 10,
  };
  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private orderService: IndustryService,
              private toasterService: ToasterService,
              private dialogService: DialogService,
              private transalate: TranslateService) {
  }

  ngOnInit() {
    this.getAllindustries();
  }

  // 获取所有订单列表
  async getAllindustries(): Promise<any> {
    try {
      this.tableLoading = true;
      const data = await this.orderService.getAllindustries(this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
      this.toasterService.pop('error', this.transalate.instant('panel.message.error'), err);
    }
  }

  openModal(data?: any) {
    if (!_.isUndefined(data)) {
      this.addIndustry = data;
      this.funcName = "update";
      this.editModal.show();
    } else {
      this.addIndustry = new AddIndustry();
      this.funcName = "store";
      this.editModal.show();
    }
    this.isInitModal = true;
  }

  closeModal(modal) {
    modal.hide();
    this.isInitModal = false;
  }


  // 创建
  async onSubmit(): Promise<any> {
    try {
      if (this.funcName === 'updateCategory') {
        this.message = 'panel.message.update_message';
      } else {
        this.message = 'panel.message.store_message';
      }
      await this.orderService[this.funcName](this.addIndustry).toPromise();
      this.getAllindustries();
      this.editModal.hide();
      this.toasterService.pop('success', '', this.transalate.instant(this.message));
    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
    }
  }


  async switchEnable(data: any): Promise<any> {
    try {
      this.tableLoading = true;
      const updata = {
        id:data.id,
        isFeatured:data.isFeatured,
      }
      await this.orderService.update(data).toPromise();
       await this.getAllindustries();

      this.tableLoading = false;

    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
      this.tableLoading = false;
    }
  }


  // 删除分类
  async delete(data: any): Promise<any> {
    try {
      this.tableLoading = true;
      const confirmed = await this.dialogService.confirm('confirm delete?');
      if (confirmed) {
        this.tableLoading = true;
        await this.orderService.delete(data).toPromise();
        this.toasterService.pop('success', '', this.transalate.instant('panel.message.delete_message'));
      }
      if (this.rows.length === 1 && this.filter.page - 1 > 0) {
        this.filter.page -= 1;
      }
      this.getAllindustries();
    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
      this.tableLoading = false;
    }
  }


  // 切换分页
  changePage(event: any): void {
    this.filter.page = event.page;
    this.getAllindustries();
  }
}
