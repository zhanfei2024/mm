import {Component, OnInit, DoCheck} from '@angular/core';
import {Location} from "@angular/common";
import {CocShowService, NewsDetail} from "../coc-show.service";
import {ActivatedRoute} from '@angular/router';
import {ToasterService} from "angular2-toaster";
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from '@ngx-translate/core';
import * as _ from "lodash";

@Component({
  templateUrl: './news-detail.component.html'
})
export class NewsDetailComponent implements OnInit, DoCheck {
  public newsDetail: NewsDetail = new NewsDetail();
  private cocId: string;
  public newsDetailTitle: string;
  public newsDetailEmpty: boolean;
  public newsDetailLoading: boolean;
  public cocName: string;
  public newsContent: string;
  constructor(private location: Location,
              private cocShowService: CocShowService,
              private route: ActivatedRoute,
              private toasterService: ToasterService,
              private translateService: TranslateService,
              private seoService: SeoService) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.cocId = localStorage.getItem('cocId');
    /**
     *获取路由参数id,调用方法
     */
    this.route.params.subscribe(
      (params) => {
        this.getNewsDetail(this.cocId, params['newsId']);
      }
    );
  }

  ngDoCheck() {
    let title = `${this.newsDetailTitle}_${this.cocName}_${this.translateService.instant('global.coc_title')}`;
    let keyWords = `${this.newsDetailTitle}`;
    let description = `${this.newsContent}`;
    this.seoService.setTitle(title, this.seoService.getTitleContent());
    this.seoService.setKeyWords(keyWords);
    this.seoService.setDescription(description);
  }

  /**
   *获取商会新闻详情
   */
  async getNewsDetail(cocId: string, postId: string): Promise<any> {
    try {
      this.newsDetailLoading = true;
      let data = await this.cocShowService.findEnterprisePost(cocId, postId).toPromise();
      this.newsDetail = data.result;
      this.newsDetailEmpty = _.isNull(this.newsDetail);
      this.newsDetailTitle = data.result.title;
      this.newsContent = this.newsDetail.content.replace(/[<][^>]+[>]/g, '').slice(0, 120);
      this.cocName = this.newsDetail.coc.name;
      this.newsDetailLoading = false;
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
      this.newsDetailLoading = false;
    }
  }

  back(): void {
    this.location.back();
  }
}
