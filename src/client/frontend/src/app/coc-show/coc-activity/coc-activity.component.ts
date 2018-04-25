import {Component, DoCheck, OnInit} from '@angular/core';
import {IFilter, IMeta} from "../../../common/http/http.service";
import {CocShowService, CocActivity} from "../coc-show.service";
import {ToasterService} from "angular2-toaster";
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";
import * as _ from "lodash";

@Component({
  templateUrl: './coc-activity.component.html'
})
export class CocActivityComponent implements OnInit, DoCheck {
  public cocId: string;
  public filter: IFilter = {
    page: 1,
    limit: 6,
    sorting: '',
    search: '',
  };
  public meta: IMeta = {pagination: {}};
  public activities: CocActivity[];
  public activitiesLoading: boolean;
  public cocName: string;

  constructor(private cocShowService: CocShowService,
              private toasterService: ToasterService,
              private seoService: SeoService,
              private translateService: TranslateService) {
  }

  ngDoCheck() {
    let title = `${this.translateService.instant('cocShow.home.coc_activity')}_${this.cocName}_${this.translateService.instant('global.coc_title')}`;
    let keyWords = ` `;
    let description = ` `;
    this.seoService.setTitle(title, this.seoService.getTitleContent());
    this.seoService.setKeyWords(keyWords);
    this.seoService.setDescription(description);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cocId = localStorage.getItem('cocId');
    this.getActivities(this.cocId);
  }

  /**
   *获取商会活动列表
   */
  async getActivities(id: string): Promise<any> {
    try {
      this.activitiesLoading = true;
      this.filter['cocId'] = id;
      let data = await this.cocShowService.findCocActivities(
        this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.activities = data.result;
      this.meta = data.meta;
      this.cocName =_.isUndefined(this.activities[0]) ? '' : this.activities[0].coc.name;
      this.activitiesLoading = false;
    } catch (err) {
      this.activitiesLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *分页
   */
  async pageChanged(event: any) {
    this.filter.page = event.page;
    this.filter.limit = event.itemsPerPage;
    window.scrollTo(0, 0);
    await this.getActivities(this.cocId);
  }
}
