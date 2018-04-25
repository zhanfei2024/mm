import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import {ICoc, CocActivity, CocPost, CocHistories, CocCarousel, CocShowService} from "../coc-show.service";
import {ToasterService} from "angular2-toaster";
import {IFilter, IMeta} from "../../../common/http/http.service";
import * as _ from "lodash"
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './coc-home.component.html'
})
export class CocHomeComponent implements OnInit, DoCheck {
  public cocId: string;
  public index: number;
  public cocPostPage = 1;
  public cocCharityPage = 1;
  public cocActivitiesPage = 1;
  public filter: IFilter = {
    page: 1,
    limit: 4,
    sorting: '',
    search: '',
  };
  public cocPostMeta: IMeta = {pagination: {}};
  public cocActivitiesMeta: IMeta = {pagination: {}};
  public cocCarousel: CocCarousel[];
  public cocSelf: ICoc;
  public cocPost: CocPost[];
  public cocActivities: CocActivity[];
  public newsLoading: boolean;
  public activitiesLoading: boolean;
  public frameworkLoading: boolean;
  public cocSelfEmpty: boolean;
  public cocName: string;
  public config: SwiperConfigInterface = {
    pagination: '.swiper-pagination',
    autoplay: 5000,
  };

  constructor(private cocShowService: CocShowService,
              private seoService: SeoService,
              private toasterService: ToasterService,
              private activeRouter: ActivatedRoute,
              private translateService: TranslateService) {
  }

  ngDoCheck() {
    let title = `${this.cocName}_${this.translateService.instant('global.coc_long_title')}`;
    let keyWords = `${this.cocName}`;
    let description = `${this.cocName}${this.translateService.instant('global.coc_description')}`;
    this.seoService.setTitle(title, this.seoService.getTitleContent());
    this.seoService.setKeyWords(keyWords);
    this.seoService.setDescription(description);
  }

  ngOnInit() {

    /**
     *获取路由参数id,调用方法
     */
    window.scrollTo(0, 0);
    this.activeRouter.params.subscribe((params) => {
      this.cocId = params['id'];
      this.getCocSelf(this.cocId);
      this.getCocActivities(this.cocId);
      this.getCocNews(this.cocId);
      this.getCocCarousel(this.cocId);
    })
  }

  /**
   *排序
   */
  compareUp(propertyName: string): any { // 升序排序
    return function (object1, object2) { // 属性值为数字
      let value1 = object1[propertyName];
      let value2 = object2[propertyName];
      return value1 - value2;
    }
  }

  /**
   *获取指定id商会轮播图
   */
  async getCocCarousel(id: string): Promise<any> {
    try {
      this.filter['cocId'] = id;
      this.filter.limit = 6;
      let data = await this.cocShowService.findCocCarousel(
        this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.cocCarousel = data.result.sort(this.compareUp('order'));
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *获取指定id商会数据
   */
  async getCocSelf(id: string): Promise<any> {
    try {
      this.frameworkLoading = true;
      let data = await this.cocShowService.findCocSelf(id).toPromise();
      this.cocSelf = data;
      this.cocName = _.isUndefined(this.cocSelf.name) ? '' : this.cocSelf.name;
      this.cocSelfEmpty = _.isNull(this.cocSelf);
      this.frameworkLoading = false;
    } catch (err) {
      this.frameworkLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *获取指定id商会新闻列表
   */
  async getCocNews(id: string): Promise<any> {
    try {
      this.newsLoading = true;
      this.filter['cocId'] = id;
      this.filter.page = this.cocPostPage;
      let data = await this.cocShowService.findCocPost(this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.cocPost = data.result;
      this.cocPostMeta = data.meta;
      this.newsLoading = false;
    } catch (err) {
      this.newsLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }


  /**
   *获取指定id商会活动列表
   */
  async getCocActivities(id: string): Promise<any> {
    try {
      this.activitiesLoading = true;
      this.filter['cocId'] = id;
      this.filter.limit = 3;
      this.filter.page = this.cocActivitiesPage;
      let data = await this.cocShowService.findCocActivities(this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.cocActivities = data.result;
      this.cocActivitiesMeta = data.meta;
      this.activitiesLoading = false;
    } catch (err) {
      this.activitiesLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }


}
