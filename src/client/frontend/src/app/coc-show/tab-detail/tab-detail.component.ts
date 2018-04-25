import {Component, OnInit, DoCheck} from '@angular/core';
import {SeoService} from "../../../common/global/seo";
import {ICoc, CocShowService} from "../coc-show.service";
import {TranslateService} from "@ngx-translate/core";
import {ToasterService} from 'angular2-toaster';
import * as _ from "lodash";
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './tab-detail.component.html'
})
export class TabDetailComponent implements OnInit, DoCheck {
  public cocSelf: ICoc;
  public cocId: string;
  public frameworkLoading: boolean;
  public cocSelfEmpty: boolean;
  public cocName: string;
  public content: string;
  public tabId: string;
  constructor(private cocShowService: CocShowService,
              private seoService: SeoService,
              private toasterService: ToasterService,
              private translateService: TranslateService,
              private route: ActivatedRoute) {
  }

  ngDoCheck() {
    let title = `${this.translateService.instant('cocShow.framework.introduction_coc')}_${this.cocName}_${this.translateService.instant('global.coc_title')}`;
    let keyWords = `${this.cocName}${this.translateService.instant('cocShow.framework.introduction_coc')}`;
    let description = `${this.content}`;
    this.seoService.setTitle(title, this.seoService.getTitleContent());
    this.seoService.setKeyWords(keyWords);
    this.seoService.setDescription(description);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cocId = localStorage.getItem('cocId');
    this.route.params.subscribe(
      (params) => {
        this.getTab(this.cocId, params['tabId']);
      }
    );
  }

  /**
   *获取指定id商会数据
   */
  async getTab(cocId: string, tabId: string): Promise<any> {
    try {
      this.frameworkLoading = true;
      let data = await this.cocShowService.getTab(cocId, tabId).toPromise();
      this.cocSelf = data.result;
      this.cocName =_.isUndefined(this.cocSelf.name) ? '' : this.cocSelf.name;
      // this.content = this.cocSelf.description.replace(/[<][^>]+[>]/g, '').slice(0, 120);
      this.cocSelfEmpty = _.isNull(this.cocSelf);
      this.frameworkLoading = false;
    } catch (err) {
      this.frameworkLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }
}
