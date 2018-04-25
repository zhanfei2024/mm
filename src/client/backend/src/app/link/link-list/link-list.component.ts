import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {IAddIink, LinkService} from "../link.service";
import {DialogService} from "../../../common/dialog/dialog.service";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})

export class LinkListComponent implements OnInit {
  public tableLoading = false;
  public isInitModal = false;
  public isResetBtnDisabled = true;
  public rows: any[] = [];
  public link: any;
  public meta: IMeta = {pagination: {}};
  public funcName: string;
  public message: string;
  public filter: IFilter = {
    page: 1,
    limit: 10,
  };
  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private linkService: LinkService,
              private toasterService: ToasterService,
              private dialogService: DialogService,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.readTables();

  }


  async readTables(): Promise<any> {
    try {
      this.tableLoading = true;
      const data = await this.linkService.get(this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      this.tableLoading = true;
      const confirmed = await this.dialogService.confirm('confirm delete?');
      if (confirmed) {
        this.tableLoading = true;
        await this.linkService.delete(id).toPromise();
        this.toasterService.pop('success', '', this.i18nService.instant('panel.message.delete_message'));
      }
      if (this.rows.length === 1 && this.filter.page - 1 > 0) {
        this.filter.page -= 1;
      }
      this.readTables();
    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
      this.tableLoading = false;
    }
  }

  // 创建
  async onSubmit(): Promise<any> {
    try {
      if (this.funcName === 'updateCategory') {
        this.message = 'panel.message.update_message';
      } else {
        this.message = 'panel.message.store_message';
      }
      await this.linkService[this.funcName](this.link).toPromise();
      this.readTables();
      this.editModal.hide();
      this.toasterService.pop('success', '', this.i18nService.instant(this.message));
    } catch (err) {
      this.toasterService.pop('error', 'Error', err.message);
    }
  }

  async switchEnable(data: any): Promise<any> {
    try {
      await this.linkService.update(data).toPromise();
      await this.readTables();
    } catch (err) {
      this.toasterService.pop('error', 'Error', err.message);
    }
  }

  openModal(data?: any) {
    if (!_.isUndefined(data)) {
      this.link = data;
      this.funcName = 'update';
      this.editModal.show();
    } else {
      this.link = new IAddIink();
      this.funcName = 'store';
      this.link.linkUrl = 'https://';
      this.editModal.show();
    }
    this.isInitModal = true;
  }

  closeModal(modal) {
    modal.hide();
    this.isInitModal = false;
  }


  // 切换分页
  changePage(event: any): void {
    this.filter.page = event.page;
    this.readTables();
  }
}
