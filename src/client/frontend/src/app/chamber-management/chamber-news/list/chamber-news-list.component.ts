import {Component, DoCheck, OnInit} from '@angular/core';
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";
import {DialogService} from "../../../../common/dialog/dialog.service";
import {IFilter, IMeta} from "../../../../common/http/http.service";
import * as _ from "lodash";
import {SeoService} from "../../../../common/global/seo";
import {ChamberNewsService} from "../chamber-news.service";

@Component({
  templateUrl: './chamber-news-list.component.html',
})
export class ChamberNewsListComponent implements OnInit, DoCheck {
  public tableLoading: boolean;
  public routerUrl: any;
  public editRouterUrl: any;
  public funcName: string;
  public deleteName: string;
  public title: string;
  public id: string;
  public rows: any;
  public filter: IFilter = {
    page: 1,
    limit: 6,
    search: '',
  };
  public meta: IMeta = {pagination: {}};

  constructor(private chamberNewsService: ChamberNewsService,
              private dialogService: DialogService,
              private translate: TranslateService,
              private seoService: SeoService,
              private toasterService: ToasterService) {
  }

  ngDoCheck() {
    if (location.hash === `#/chamber/${localStorage.getItem('chamber')}/news/list`) {
      this.title = 'chamber.left.news';
    } else {
      this.title = 'chamber.left.notice';
    }
    this.seoService.setTitle(this.translate.instant(this.title), this.seoService.getTitleContent());
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    if (location.hash === `#/chamber/${localStorage.getItem('chamber')}/news/list`) {
      this.funcName = 'get';
      this.routerUrl = ['/chamber', this.id, 'news', 'create'];
      this.deleteName = 'delete';
      this.editRouterUrl = 'news';
      this.title = 'chamber.left.news';
    } else {
      this.funcName = 'getNotice';
      this.routerUrl = ['/chamber', this.id, 'notice', 'create'];
      this.deleteName = 'deleteNotice';
      this.editRouterUrl = 'notice';
      this.title = 'chamber.left.notice';
    }
    this.getList();
  }


  async changePage(event: any) {
    this.filter.page = event.page;
    await this.getList();
  }

  onSearch(): void {
    this.filter.page = 1;
    this.getList();
  }


  async getList() {
    try {
      this.tableLoading = true;
      let data = await this.chamberNewsService[this.funcName](localStorage.getItem('chamber'), this.filter.search === '' ? _.omit(this.filter, 'search') : this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const confirmed = await this.dialogService.confirm('confirm delete?');
      if (confirmed) {
        this.tableLoading = true;
        await this.chamberNewsService[this.deleteName](localStorage.getItem('chamber'), id).toPromise();
        this.toasterService.pop('success', '', this.translate.instant('message.delete_success'));
      }
      if (this.rows.length === 1 && this.filter.page - 1 > 0) {
        this.filter.page -= 1;
      }
      this.getList();
    } catch (err) {

    }
  }

}
