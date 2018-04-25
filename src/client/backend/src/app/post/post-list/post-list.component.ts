import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {SelectComponent} from 'ng2-select';
import {IFilter, IMeta} from '../../../common/http/http.service';
import * as _ from 'lodash'
import {I18nService} from '../../../common/i18n/i18n.service';
import {PostService} from "../post.service";
import {Config} from "../../../common/config/config";
import {DialogService} from '../../../common/dialog/dialog.service';

@Component({
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
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
    sorting: '',
    title: '',
    cocName: '',
  };


  constructor(private orderService: PostService,
              private toasterService: ToasterService,
              private i18nService: I18nService,
              private dialogService: DialogService,
              private conofig: Config) {
  }

  public searchFilter ={
    page: 1,
    limit: 10,
    sorting: '',
    title:'',
    cocName:'',
  };

  public front_Path: string = this.conofig.frontPath;

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

  // 删除文章
  async deletePost(data: any): Promise<any> {
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


  async switchEnable(data: any): Promise<any> {
    try {
      this.tableLoading = true;
      //data.isActive = !data.isActive;
      await this.orderService.update(data).toPromise();
      await this.getAllOrders();

      this.tableLoading = false;

    } catch (err) {
      this.toasterService.pop('error', 'Error', err);
      this.tableLoading = false;
    }
  }

  async OnSearch(): Promise<any> {
    try {
      this.tableLoading = true;
       const res = await this.orderService.getAllOrders(this.searchFilter).toPromise();
      this.rows = res.result;
      this.meta = res.meta;
      this.tableLoading = false;

    }catch (err){
      this.toasterService.pop('error', 'Error', err);
      this.tableLoading = false;
    }
  }

  async onReset(){
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
