import { Component, OnInit, DoCheck } from '@angular/core';
import { HomeService, CocPost } from "../home/home.service";
import { IMeta, IFilter } from "../../common/http/http.service";
import * as _ from "lodash";
import { SeoService } from "../../common/global/seo";
import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: './news-list.component.html',
})
export class NewsListComponent implements OnInit, DoCheck {
  public filter: IFilter = {
    page: 1,
    limit: 6,
    sorting: 'newest',
    search: '',
  };
  public meta: IMeta = { pagination: {} };
  public news: CocPost[] = [];
  public tableLoading: boolean;

  constructor(private homeService: HomeService,
    private seoService: SeoService,
    private translate: TranslateService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(`${this.translate.instant('navbar.news_list')}_${this.translate.instant('global.coc_title')}`, this.seoService.getTitleContent());
    this.seoService.setKeyWords(`${this.translate.instant('navbar.news_list')}`);
    this.seoService.setDescription(`${this.translate.instant('global.coc_news_description')}`);
  }

  ngOnInit() {
    this.readPostCallServer();
  }

  /**
   *
   *页面初始化执行获取新闻列表
   */
  async readPostCallServer(): Promise<any> {
    try {
      this.tableLoading = true;
      let data = await this.homeService.getNews(
        this.filter.search === '' ? _.omit(this.filter, ['search']) : this.filter).toPromise();
      this.news = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false; // for demo purposes only
    }
  }

  /**
   *分页
   */
  async pageChanged(event: any) {
    this.filter.page = event.page;
    this.filter.limit = event.itemsPerPage;
    window.scrollTo(0, 0);
    await this.readPostCallServer();
  }
}
