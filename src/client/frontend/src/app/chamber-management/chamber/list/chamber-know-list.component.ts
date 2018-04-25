import {Component, DoCheck, OnInit} from '@angular/core';
import {ToasterService} from "angular2-toaster";
import {DialogService} from "../../../../common/dialog/dialog.service";
import {TranslateService} from "@ngx-translate/core";
import {IFilter, IMeta} from "../../../../common/http/http.service";
import * as _ from "lodash";
import {SeoService} from "../../../../common/global/seo";
import {AddKnowService} from "../chamber-know.service";


@Component({
  templateUrl: './chamber-know-list.component.html',
})
export class ChamberKnowListComponent implements OnInit, DoCheck {
  public id: string;
  public know: any;
  public tableLoading: boolean;
  public filter: IFilter = {
    page: 1,
    limit: 6,
    sorting: '',
    search: '',
  };
  public meta: IMeta = {pagination: {}};


  constructor(private addKnowService: AddKnowService,
              private dialogService: DialogService,
              private translate: TranslateService,
              private seoService: SeoService,
              private toasterService: ToasterService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant('chamber.left.know'), this.seoService.getTitleContent());
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.getKnow();
  }

  async changePage(event: any) {
    this.filter.page = event.page;
    await this.getKnow();
  }

  onSearch(): void {
    this.filter.page = 1;
    this.getKnow();
  }

  async getKnow() {
    try {
      this.tableLoading = true;
      let data = await this.addKnowService.get(this.id, this.filter.search === '' ? _.omit(this.filter, 'search') : this.filter).toPromise();
      this.know = data.result;
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
        await this.addKnowService.delete(this.id, id).toPromise();
        this.toasterService.pop('success', '', this.translate.instant('message.delete_success'));
      }
      if (this.know.length === 1 && this.filter.page - 1 > 0) {
        this.filter.page -= 1;
      }
      this.getKnow();
    } catch (err) {

    }
  }
}
