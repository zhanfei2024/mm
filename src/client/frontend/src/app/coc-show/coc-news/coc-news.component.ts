import {Component, OnInit, DoCheck} from '@angular/core';
import {CocShowService, CocPost} from "../coc-show.service";
import {IFilter, IMeta} from "../../../common/http/http.service";
import {ToasterService} from "angular2-toaster";
import * as _ from "lodash";
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: './coc-news.component.html'
})
export class CocNewsComponent implements OnInit, DoCheck {
  public filter: IFilter = {
    page: 1,
    limit: 5,
    sorting: '',
    search: '',
  };
  public news: CocPost[];

  public meta: IMeta = {pagination: {}};
  public cocId: string;
  public newsShow: boolean = true;
  public newsLoading: boolean;
  public cocName: string;
  constructor(private cocShowService: CocShowService,
              private toasterService: ToasterService,
              private seoService: SeoService,
              private translateService: TranslateService) {
  }

  ngDoCheck() {
    let title = `${this.translateService.instant('cocShow.home.coc_news')}_${this.cocName}_${this.translateService.instant('global.coc_title')}`;
    let keyWords = ` `;
    let description = ` `;
    this.seoService.setTitle(title, this.seoService.getTitleContent());
    this.seoService.setKeyWords(keyWords);
    this.seoService.setDescription(description);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cocId = localStorage.getItem('cocId');
    this.getNews(this.cocId);
  }

  /**
   *获取商会新闻列表
   */
  async getNews(id: string): Promise<any> {
    try {
      this.newsLoading = true;
      this.filter['cocId'] = id;
      let data = await this.cocShowService.findCocPost(this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.news = data.result;
      this.meta = data.meta;
      this.cocName = _.isUndefined(data.result[0]) ?  '' : this.news[0].coc.name;
      this.newsLoading = false;
    } catch (err) {
      this.newsLoading = false;
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
    await this.getNews(this.cocId);
  }
}
