import {Component, OnInit, DoCheck} from '@angular/core';
import {SeoService} from "../../../common/global/seo";
import {ICoc, CocShowService} from "../coc-show.service";
import {TranslateService} from "@ngx-translate/core";
import {ToasterService} from 'angular2-toaster';
import * as _ from "lodash";

@Component({
  templateUrl: './coc-framework.component.html'
})
export class CocFrameworkComponent implements OnInit, DoCheck {
  public cocSelf: ICoc;
  public cocId: string;
  public frameworkLoading: boolean;
  public cocSelfEmpty: boolean;
  public cocName: string;
  public content: string;
  constructor(private cocShowService: CocShowService,
              private seoService: SeoService,
              private toasterService: ToasterService,
              private translateService: TranslateService) {
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
    this.getCocSelf(this.cocId);
  }

  /**
   *获取指定id商会数据
   */
  async getCocSelf(id: string): Promise<any> {
    try {
      this.frameworkLoading = true;
      let data = await this.cocShowService.findCocSelf(id).toPromise();
      this.cocSelf = data;
      this.cocName =_.isUndefined(this.cocSelf.name) ? '' : this.cocSelf.name;
      this.content = this.cocSelf.description.replace(/[<][^>]+[>]/g, '').slice(0, 120);
      this.cocSelfEmpty = _.isNull(this.cocSelf);
      this.frameworkLoading = false;
    } catch (err) {
      this.frameworkLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }
}
