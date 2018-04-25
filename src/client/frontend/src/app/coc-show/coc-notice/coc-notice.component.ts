import {Component, OnInit, DoCheck} from '@angular/core';
import {CocNotice, CocShowService} from "../coc-show.service";
import {IFilter, IMeta} from "../../../common/http/http.service";
import * as _ from "lodash"
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";
import {ToasterService} from 'angular2-toaster';

@Component({
  templateUrl: './coc-notice.component.html'
})
export class CocNoticeComponent implements OnInit, DoCheck {
  public cocId: string;
  public cocNoticeMeta: IMeta = {pagination: {}};
  public cocNotice: CocNotice[];
  public cocNoticeLoading: boolean;
  public cocName: string;
  public filter: IFilter = {
    page: 1,
    limit: 5,
    sorting: '',
    search: '',
  };

  constructor(private seoService: SeoService,
              private translateService: TranslateService,
              private cocShowService: CocShowService,
              private toasterService: ToasterService) {
  }

  ngDoCheck() {
    let title = `${this.translateService.instant('cocShow.notice.member_notice')}_${this.cocName}_${this.translateService.instant('global.coc_title')}`;
    let keyWords = ` `;
    let description = ` `;
    this.seoService.setTitle(title, this.seoService.getTitleContent());
    this.seoService.setKeyWords(keyWords);
    this.seoService.setDescription(description);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cocId = localStorage.getItem('cocId');
    this.getCocNotice(this.cocId);
  }

  /**
   *获取指定id商会公告列表
   */
  async getCocNotice(id: string): Promise<any> {
    try {
      this.cocNoticeLoading = true;
      let data = await this.cocShowService.findCocNotice(id,
        this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.cocNotice = data.result;
      this.cocNoticeMeta = data.meta;
      this.cocName = _.isUndefined(this.cocNotice[0]) ?  '' : this.cocNotice[0].coc.name;
      this.cocNoticeLoading = false;
    } catch (err) {
      this.cocNoticeLoading = false;
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
    await this.getCocNotice(this.cocId);
  }
}
