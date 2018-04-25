import {Component, DoCheck, OnInit} from '@angular/core';
import {IFilter, IMeta} from "../../../../common/http/http.service";
import {ChamberActivityService} from "../chamber-activity.service";
import {DialogService} from "../../../../common/dialog/dialog.service";
import {TranslateService} from "@ngx-translate/core";
import {ToasterService} from "angular2-toaster";
import * as _ from "lodash";
import {SeoService} from "../../../../common/global/seo";

@Component({
  templateUrl: './chamber-activity-list.component.html',
})
export class ChamberActivityListComponent implements OnInit, DoCheck {
  public id: string;
  public rows: any;
  public tableLoading: boolean;
  public public: any[];
  public status: any[];
  public filter: IFilter = {
    page: 1,
    limit: 6,
    status: '',
    search: '',
  };
  public meta: IMeta = {pagination: {}};

  constructor(private chamberActivityService: ChamberActivityService,
              private dialogService: DialogService,
              private translate: TranslateService,
              private seoService: SeoService,
              private toasterService: ToasterService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant('chamber.left.activity'), this.seoService.getTitleContent());
    this.status = [
      {id: ' ', text: this.translate.instant('cocShow.home.whole')},
      {id: 'in-process', text: this.translate.instant('cocShow.home.in-process')},
      {id: 'sign-up', text: this.translate.instant('cocShow.home.sign-up')},
      {id: 'closed', text: this.translate.instant('cocShow.home.closed')},
      {id: 'ended', text: this.translate.instant('cocShow.home.ended')},
      {id: 'full', text: this.translate.instant('cocShow.home.full')},
    ];
    this.public = [
      {id: 'true', text: this.translate.instant('global.true_public')},
      {id: 'false', text: this.translate.instant('global.false_public')},
    ];
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.reloadTable();
  }

  async changePage(event: any) {
    this.filter.page = event.page;
    await this.reloadTable();
  }

  onSearch(): void {
    this.filter.page = 1;
    this.reloadTable();
  }

  changStatus(data: any, type: string) {
    switch (type) {
      case "public":
        this.filter.isPublic = data.id;
        break;
      case "status":
        this.filter.status = data.id;
        break;
    }
    this.reloadTable();
  }

  async reloadTable() {
    try {
      this.tableLoading = true;
      let data = await this.chamberActivityService.get(this.id, this.filter.search === '' ? _.omit(this.filter, 'search') : this.filter).toPromise();
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
        await this.chamberActivityService.delete(this.id, id).toPromise();
        this.toasterService.pop('success', '', this.translate.instant('message.delete_success'));
      }
      if (this.rows.length === 1 && this.filter.page - 1 > 0) {
        this.filter.page -= 1;
      }
      this.reloadTable();
    } catch (err) {

    }
  }
}
