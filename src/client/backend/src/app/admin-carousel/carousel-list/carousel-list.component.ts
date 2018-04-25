import {Component, OnInit} from '@angular/core';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {CarouselService} from "../carousel.service";
import {DialogService} from "../../../common/dialog/dialog.service";
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: './carousel-list.component.html',
  styleUrls: ['./carousel-list.component.css']
})

export class CarouselListComponent implements OnInit {
  tableLoading = false;
  rows: any[] = [];
  meta: IMeta = {pagination: {}};
  public filter: IFilter = {
    page: 1,
    limit: 10,
    type: 'platform',
  };

  constructor(private orderService: CarouselService,
              private dialogService: DialogService,
              private toasterService: ToasterService,
              private transalate: TranslateService) {
  }

  ngOnInit() {
    this.readTables();
  }


  // 获取所有订单列表
  async readTables(): Promise<any> {
    try {
      this.tableLoading = true;
      const data = await this.orderService.get(this.filter).toPromise();
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
        await this.orderService.delete(id).toPromise();
        this.toasterService.pop('success', '', this.transalate.instant('panel.message.delete_message'));
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



  // 切换分页
  changePage(event: any): void {
    this.filter.page = event.page;
    this.readTables();
  }
}
