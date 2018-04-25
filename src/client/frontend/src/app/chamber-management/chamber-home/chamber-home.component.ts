import {Component, DoCheck, OnInit} from '@angular/core';
import {ChamberService} from "../chamber.service";
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: './chamber-home.component.html',
})
export class ChamberHomeComponent implements OnInit, DoCheck {
  public tableLoading: boolean;
  public candidates: any;
  public id: string;

  constructor(private chamberService: ChamberService,
              private seoService: SeoService,
              private translate: TranslateService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant('chamber.left.home'), this.seoService.getTitleContent());
  }


  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.readTable();
  }

  async readTable() {
    try {
      this.tableLoading = true;
      let data = await this.chamberService.getStatistics(this.id, {}).toPromise();
      this.candidates = data.result;

      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }


}
