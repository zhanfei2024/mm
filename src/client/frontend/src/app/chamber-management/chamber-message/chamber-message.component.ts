import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {IFilter, IMeta} from "../../../common/http/http.service";
import {ChamberMessageService} from "./chamber-message-service";
import * as _ from "lodash";
import {ModalDirective} from "ngx-bootstrap";
import {ToasterService} from "angular2-toaster";
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: './chamber-message.component.html',
})
export class ChamberMessageComponent implements OnInit, DoCheck {
  public id: string;
  public messageReply: string;
  public rows: any;
  public indexRows: any;
  public tableLoading: boolean;
  public submitLoading: boolean;
  public filter: IFilter = {
    page: 1,
    limit: 6,
    status: '',
    search: '',
  };
  public meta: IMeta = {pagination: {}};
  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private chamberMessageService: ChamberMessageService,
              private seoService: SeoService,
              private translate: TranslateService,
              private toasterService: ToasterService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant('chamber.left.message'), this.seoService.getTitleContent());
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.reloadTable();
  }

  onSearch(): void {
    this.filter.page = 1;
    this.reloadTable();
  }


  async reloadTable() {
    try {
      this.tableLoading = true;
      let data = await this.chamberMessageService.get(this.id, this.filter.search === '' ? _.omit(this.filter, 'search') : this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  openModel(index: number) {
    this.indexRows = this.rows[index];
    this.editModal.show();
  }


  async reply(id: string) {
    try {
      this.submitLoading = true;
      await this.chamberMessageService.update(this.id, {
        messageId: id,
        messageReply: this.messageReply
      }).toPromise();
      this.submitLoading = false;
      this.toasterService.pop('success', 'Success', 'Success');
      this.editModal.hide();
      this.reloadTable();
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }

  async changePage(event: any) {
    this.filter.page = event.page;
    await this.reloadTable();
  }

}
