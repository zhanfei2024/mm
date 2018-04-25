import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {IFilter, IMeta} from "../../../common/http/http.service";
import * as _ from 'lodash';
import {ChamberPaymentSevice, Payment} from "./chamber-payment.sevice";
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";
import {DialogService} from "../../../common/dialog/dialog.service";
import {SeoService} from "../../../common/global/seo";

@Component({
  templateUrl: './chamber-payment.component.html',
})
export class ChamberPaymentComponent implements OnInit, DoCheck {
  @ViewChild('editModal') public editModal: ModalDirective;
  public filter: IFilter = {
    page: 1,
    limit: 6,
    sorting: '',
    search: '',
  };
  public meta: IMeta = {pagination: {}};
  public bank: Payment = new Payment()
  public funcName: string;
  public tableLoading: boolean;
  public submitLoading: boolean;
  public rows: any;
  public message: string;
  public title: string;

  constructor(private chamberPaymentSerivce: ChamberPaymentSevice,
              private transalate: TranslateService,
              private dialogService: DialogService,
              private translate: TranslateService,
              private seoService: SeoService,
              private toasterService: ToasterService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant('chamber.left.payment'), this.seoService.getTitleContent());
  }


  ngOnInit() {
    this.reloadTable();
  }

  //分頁
  async changePage(event: any) {
    this.filter.page = event.page;
    await this.reloadTable();
  }

  onSearch(): void {
    this.filter.page = 1;
    this.reloadTable();
  }

  // 获取分类列表
  async reloadTable(): Promise<any> {
    try {
      this.tableLoading = true;
      const data = await this.chamberPaymentSerivce.get(localStorage.getItem('chamber'), this.filter).toPromise();
      this.rows = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }


  openModal(data?: any) {
    if (!_.isUndefined(data)) {
      this.bank = data;
      this.funcName = "update";
      this.title = "chamber.btn.edit_card";
      this.editModal.show();
    } else {
      this.bank = new Payment()
      this.funcName = "store";
      this.title = "chamber.btn.add_card";
      this.editModal.show();
    }
  }

  async onSubmit(): Promise<any> {
    try {
      this.submitLoading = true;
      if (this.funcName === 'updateCategory') {
        this.message = 'message.update_message';
      } else {
        this.message = 'message.store_message';
      }
      await this.chamberPaymentSerivce[this.funcName](localStorage.getItem('chamber'), this.bank).toPromise();
      this.submitLoading = false;
      this.reloadTable();
      this.editModal.hide();
      this.toasterService.pop('success', '', this.transalate.instant(this.message));
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const confirmed = await this.dialogService.confirm('confirm delete?');
      if (confirmed) {
        this.tableLoading = true;
        await this.chamberPaymentSerivce.delete(localStorage.getItem('chamber'), id).toPromise();
        this.toasterService.pop('success', '', this.transalate.instant('message.delete_success'));
      }
      if (this.rows.length === 1 && this.filter.page - 1 > 0) {
        this.filter.page -= 1;
      }
      this.reloadTable();
    } catch (err) {

    }
  }


}
