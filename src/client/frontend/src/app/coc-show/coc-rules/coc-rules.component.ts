import {Component, DoCheck, OnInit} from '@angular/core';
import {CocNotice, CocShowService} from "../coc-show.service";
import {ToasterService} from "angular2-toaster";
import {IFilter, IMeta} from "../../../common/http/http.service";
import * as _ from "lodash"
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: './coc-rules.component.html'
})
export class CocRulesComponent implements OnInit, DoCheck {
  public cocId: string;
  public memberNoticeMeta: IMeta = {pagination: {}};
  public memberNotice: CocNotice[];
  public filter: IFilter = {
    page: 1,
    limit: 5,
    sorting: '',
    search: '',
  };
  public memberNoticeLoading: boolean;
  public cocName: string;
  constructor(private seoService: SeoService,
              private translateService: TranslateService,
              private toasterService: ToasterService,
              private cocShowService: CocShowService) {
  }

  ngDoCheck() {
    let title = `${this.translateService.instant('cocShow.rules.member_rules')}_${this.cocName}_${this.translateService.instant('global.coc_title')}`;
    let keyWords = ` `;
    let description = ` `;
    this.seoService.setTitle(title, this.seoService.getTitleContent());
    this.seoService.setKeyWords(keyWords);
    this.seoService.setDescription(description);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cocId = localStorage.getItem('cocId');
    this.getMemberNotice(this.cocId);
  }

  /**
   *获取指定id商会入户须知列表
   */
  async getMemberNotice(id: string): Promise<any> {
    try {
      this.memberNoticeLoading = true;
      let data = await this.cocShowService.findMemberNotice(id, this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.memberNotice = data.result;
      this.memberNoticeMeta = data.meta;
      this.cocName = _.isUndefined(this.memberNotice[0]) ?  '' : this.memberNotice[0].coc.name;
      this.memberNoticeLoading = false;
    } catch (err) {
      this.memberNoticeLoading = false;
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
    await this.getMemberNotice(this.cocId);
  }
}
