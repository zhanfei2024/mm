import {Component, OnInit, DoCheck} from '@angular/core';
import {Location} from "@angular/common";
import {CocShowService, RulesDetail} from "../coc-show.service";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "../../../common/global/seo";
import {ToasterService} from 'angular2-toaster';
import {TranslateService} from '@ngx-translate/core';
import * as _ from "lodash";

@Component({
  templateUrl: './rules-detail.component.html'
})
export class RulesDetailComponent implements OnInit, DoCheck {


  public cocRulesDetail: RulesDetail;
  private cocId: string;
  public userId: string;
  public cocRulesDetailTitle: string;
  public cocRulesEmpty: boolean;
  public RulesDetailLoading: boolean;
  public cocName: string;
  public content: string;
  constructor(private location: Location,
              private cocShowService: CocShowService,
              private route: ActivatedRoute,
              private seoService: SeoService,
              private translateService: TranslateService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.cocId = localStorage.getItem('cocId');
    /**
     *获取路由参数id,调用方法
     */
    this.route.params.subscribe(
      (params) => {
        this.findMemberRulesDetail(this.cocId, params['rulesId']);
      }
    );

  }

  ngDoCheck() {
    let title = `${this.cocRulesDetailTitle}_${this.cocName}_${this.translateService.instant('global.coc_title')}`;
    let keyWords = `${this.cocRulesDetailTitle}`;
    let description = `${this.content}`;

    this.seoService.setTitle(title, this.seoService.getTitleContent());
    this.seoService.setKeyWords(keyWords);
    this.seoService.setDescription(description);
  }

  /**
   *获取入会须知详情
   */
  async findMemberRulesDetail(cocId: string, roleId: string): Promise<any> {
    try {
      this.RulesDetailLoading = true;
      let data = await this.cocShowService.findMemberRulesDetail(cocId, roleId).toPromise();
      this.cocRulesDetail = data.result;
      this.cocName = this.cocRulesDetail.coc.name;
      this.content = this.cocRulesDetail.content.replace(/[<][^>]+[>]/g, '').slice(0, 120);
      this.cocRulesEmpty = _.isNull(this.cocRulesDetail);
      this.cocRulesDetailTitle = data.result.title;
      this.RulesDetailLoading = false;
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
      this.RulesDetailLoading = false;
    }
  }

  back(): void {
    this.location.back();
  }
}
