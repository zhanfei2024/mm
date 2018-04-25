import {Component, DoCheck, OnInit} from '@angular/core';
import {IFilter, IMeta} from "../../../../common/http/http.service";
import {ChamberActivityService} from "../chamber-activity.service";
import * as _ from "lodash";
import {TranslateService} from "@ngx-translate/core";
import {ToasterService} from "angular2-toaster";
import * as moment from "moment";
import {SeoService} from "../../../../common/global/seo";


@Component({
  templateUrl: './chamber-activity-examine.component.html',
})
export class ChamberActivityExamineComponent implements OnInit, DoCheck {
  public id: string;
  public rows: any;
  public tableLoading: boolean;
  public status: any[] = [];
  public filter: IFilter = {
    page: 1,
    limit: 10,
    isPublic: true,
    status: '',
    search: '',
  };
  public meta: IMeta = {pagination: {}};

  constructor(private chamberActivityService: ChamberActivityService,
              private translate: TranslateService,
              private toasterService: ToasterService,
              private seoService: SeoService) {
  }

  ngDoCheck() {
    this.status = [
      {id: ' ', text: this.translate.instant('cocShow.home.whole')},
      {id: 'pending', text: this.translate.instant('global.pending')},
      {id: 'success', text: this.translate.instant('global.success')},
      {id: 'fail', text: this.translate.instant('global.fail')},
    ];
    this.seoService.setTitle(this.translate.instant('chamber.left.activity_examine'), this.seoService.getTitleContent());
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.reloadTable();
  }

  async exportExcel(): Promise<any> {
    try {
      let data = await this.chamberActivityService.exportCandidates(this.id, {}).toPromise();
      location.href = `${data.result}`;
    } catch (err) {
      this.toasterService.pop('error', 'error', err.message);
    }
  }


  async changePage(event: any) {
    this.filter.page = event.page;
    await this.reloadTable();
  }

  changStatus(data: any) {
    this.filter.status = data.id;
    this.reloadTable();
  }

  onSearch(): void {
    this.filter.page = 1;
    this.reloadTable();
  }

  async reloadTable() {
    try {
      this.tableLoading = true;
      let data = await this.chamberActivityService.getCandidates(this.id, this.filter.search === '' ? _.omit(this.filter, 'search') : this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async update(id: string, data: any): Promise<any> {
    try {
      this.tableLoading = true;
      await this.chamberActivityService.updateCandidates(this.id, id, data).toPromise();
      this.toasterService.pop('success', '', this.translate.instant('message.update_message'));
      this.reloadTable();
    } catch (err) {
      let message = !_.isUndefined(err.message[`${localStorage.getItem('lang')}`]) ? err.message[`${localStorage.getItem('lang')}`] : err.message;
      this.toasterService.pop('error', 'error', message);
      this.reloadTable();
    }
  }
}
