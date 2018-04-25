import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {ActivityService} from "../activity.service";
import {Config} from "../../../common/config/config";
import {DialogService} from '../../../common/dialog/dialog.service';

@Component({
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})

export class ActivityListComponent implements OnInit, AfterViewChecked {
  tableLoading = false;
  isResetBtnDisabled = true;
  rows: any[] = [];
  meta: IMeta = {pagination: {}};
  public filter: IFilter = {
    page: 1,
    limit: 10,
    sorting: '',
    title: '',
    cocName: '',
    status: '',
  };

  public category: any[] = [{id: 'sign-up', text: this.translate('activity_candidate.sign-up')}];
  public activityItems: any[] = [{id: 'sign-up', text: this.translate('activity_candidate.sign-up')},
    {id: 'ended', text: this.translate('activity_candidate.pending')},
    {id: 'full', text: this.translate('activity_candidate.full')},
    {id: 'close', text: this.translate('activity_candidate.close')},
    {id: 'in-process', text: this.translate('activity_candidate.in-process')},];

  constructor(private orderService: ActivityService,
              private toasterService: ToasterService,
              private i18nService: I18nService,
              private dialogService: DialogService,
              private config: Config) {
  }

  public frontPath = this.config.frontPath;

  translate(str: string) {
    return this.i18nService.instant(str);
  }

  ngAfterViewChecked() {
    this.activityItems = [
      {id: 'sign-up', text: this.translate('activity_candidate.sign-up')},
      {id: 'ended', text: this.translate('activity_candidate.pending')},
      {id: 'full', text: this.translate('activity_candidate.full')},
      {id: 'close', text: this.translate('activity_candidate.close')},
      {id: 'in-process', text: this.translate('activity_candidate.in-process')},
    ];
  }


  ngOnInit() {
    this.getAllOrders();

    this.getCategory();
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
      this.toasterService.pop('error', err);
    }
  }
  // 删除活动
  async deleteActivity(data: any): Promise<any> {
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

  async getCategory(): Promise<any> {
    const data = await this.orderService.getAllCategory(this.filter).toPromise();
    this.category = this.orderService.itemsToFomart(data.result);
  }


  selectCategoryStatus(e) {
    this.filter.categoryIds = [e.id];

  }

  async switchEnable(data: any): Promise<any> {
    try {
      this.tableLoading = true;
      await this.orderService.update(data).toPromise();
      await this.getAllOrders();

      this.tableLoading = false;

    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
      this.tableLoading = false;
    }
  }

  async selectStatus(e) {
    this.filter.status = e.id
  }

  onSearch() {
    this.getAllOrders();
  }

  onReset() {
    this.filter = {
      page: 1,
      limit: 10,
      sorting: '',
      title: '',
      cocName: '',
      status: '',
    };
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
