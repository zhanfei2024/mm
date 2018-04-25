import { Component, DoCheck, OnInit } from '@angular/core';
import { ChamberService } from "../chamber.service";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import { TranslateService } from "@ngx-translate/core";
import { DialogService } from "../../../common/dialog/dialog.service";
import { SeoService } from "../../../common/global/seo";

@Component({
  templateUrl: './select-chamber.component.html',
})
export class SelectChamberComponent implements OnInit, DoCheck {
  public coc: any[] = [];
  public tableLoading: boolean;

  constructor(private chamberService: ChamberService,
    private dialogService: DialogService,
    private translate: TranslateService,
    private toasterService: ToasterService,
    private router: Router,
    private seoService: SeoService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant('chamber.select.center'), this.seoService.getTitleContent());
  }

  ngOnInit() {
    this.getCoc();
  }

  selectChamber(coc: any) {
    const isApproved = coc.isApproved ? 'true' : 'false';
    if (coc.isApproved) {
      localStorage.setItem('chamber', coc.id);
      localStorage.setItem('isApproved', isApproved);
      this.router.navigate(['/chamber', coc.id, 'home']);
    } else {
      localStorage.setItem('chamber', coc.id);
      this.router.navigate(['/coc', 'success']);
    }
  }

  async getCoc(): Promise<any> {
    try {
      this.tableLoading = true;
      let data = await this.chamberService.getCoc({}).toPromise();
      this.coc = data.result.filter(item => !item['deletedAt']);
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const confirmed = await this.dialogService.confirm('confirm delete?');
      if (confirmed) {
        await this.chamberService.deleteCoc(id).toPromise();
        this.toasterService.pop('success', '', this.translate.instant('message.delete_success'));
      }
      this.getCoc();
    } catch (err) {

    }
  }


}
