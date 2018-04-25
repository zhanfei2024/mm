import { Component, OnInit } from '@angular/core';
import {ChamberTabService, Tab} from '../chamber-tab.service';
import {ToasterService} from 'angular2-toaster';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {IMeta} from '../../../../common/http/http.service';
import {TranslateService} from '@ngx-translate/core';
import {SeoService} from "../../../../common/global/seo";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  public tabs: Tab[];
  public meta: IMeta = {
    pagination: {}
  }
  public tabsLaoding: boolean;
  public chamberId: string;
  constructor(private chamberTabService: ChamberTabService,
              private toasterService: ToasterService,
              private translate: TranslateService,
              private seoService: SeoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.chamberId = localStorage.getItem('chamber');
    this.getTabs(this.chamberId);
    let title = `${this.translate.instant('chamber.tab.custom_tab')}`;
    this.seoService.setTitle(title, this.seoService.getTitleContent());
  }

  /**
   * tab 列表
   */
  async getTabs(id: string): Promise<any> {
    try {
      this.tabsLaoding = true;
      let data = await this.chamberTabService.get(id).toPromise();
      this.tabsLaoding = false;
      this.tabs = data.result;
      this.meta = data.meta;
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      let response = await this.chamberTabService.delete(this.chamberId, id).toPromise();
      this.getTabs(this.chamberId)
      this.toasterService.pop('success', 'Success', this.translate.instant('message.delete_success'));
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

}
