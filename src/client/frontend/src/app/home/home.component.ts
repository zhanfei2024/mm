import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {HomeService} from "./home.service";
import {SeoService} from "../../common/global/seo";

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewChecked {
  public hotCocs = [];
  public hotActivities = [];
  public hotNews: any[] = [];
  public tableLoading: boolean;
  public activityLoading: boolean;
  public newsLoading: boolean;

  constructor(private homeService: HomeService,
              private router: Router,
              private seoService: SeoService,
              private translate: TranslateService) {
  }

  ngAfterViewChecked() {
    this.seoService.setTitle(`${this.translate.instant('global.coc_title')}`, this.seoService.getTitleContent());
    this.seoService.setKeyWords(`${this.translate.instant('global.coc_keyWords')}`);
    this.seoService.setDescription(`${this.translate.instant('global.coc_home_description')}`);
  }

  ngOnInit() {
    this.getHotCocs();
    this.getHotActivities();
    this.getHotNews();
  }


  //商会列表
  async getHotCocs(): Promise<any> {
    try {
      this.tableLoading = true;
      let data = await this.homeService.getCocs({
        page: 1,
        limit: 3,
        sorting: 'createAtDESC'
      }).toPromise();
      this.hotCocs = data.result;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = true;
    }
  }

  //活动列表
  async getHotActivities(): Promise<any> {
    try {
      this.activityLoading = true;
      let data = await this.homeService.getActivities({
        page: 1,
        limit: 3
      }).toPromise();
      this.hotActivities = data.result;
      this.activityLoading = false;
    } catch (err) {
      this.activityLoading = false;
    }
  }

  //新闻列表
  async getHotNews(): Promise<any> {
    try {
      this.newsLoading = true;
      let data = await this.homeService.getNews({
        page: 1,
        limit: 2,
        sorting: 'newest'
      }).toPromise();
      this.hotNews = data.result;
      this.newsLoading = false;
    } catch (err) {
      this.newsLoading = false;
    }
  }

}
