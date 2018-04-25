import {Component, OnInit, ViewChild} from '@angular/core';
import {EnterpriseService} from '../enterprise.service';
import {ToasterService} from 'angular2-toaster';
import {I18nService} from '../../../common/i18n/i18n.service';
import {ActivatedRoute} from '@angular/router';
import {ModalDirective} from "ngx-bootstrap";


@Component({
  selector: 'app-order-details',
  templateUrl: './enterprise-details.component.html',
  styleUrls: ['./enterprise-details.component.scss']
})
export class EnterpriseDetailsComponent implements OnInit {


  details: any;
  btn_status = false;
  btn_string = 'coc.detail.proved';
  btn_class: string;
  modalDetailsLoading = false;

  isInitModal: boolean;
  imgSrc: string;

  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private orderService: EnterpriseService,
              private toasterService: ToasterService,
              private i18nService: I18nService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.showOrderDetails(this.activatedRoute.snapshot.params.id);
  }

  // 显示订单详情
  async showOrderDetails(id: string): Promise<any> {
    try {
      this.modalDetailsLoading = true;
      this.details = await this.orderService.find(id).toPromise();
      this.modalDetailsLoading = false;
    } catch (err) {
      this.modalDetailsLoading = false;
      this.toasterService.pop('error', this.i18nService.instant('panel.message.error'), err);
    }
  }

  async onUpdateIsProved(isProved: boolean, data: any): Promise<any> {
    try {
      const updata = {
        isApproved: isProved,
        id: data.id
      };
      this.modalDetailsLoading = true;
      this.details = await this.orderService.update(updata).toPromise();
      this.modalDetailsLoading = false;

      this.btn_status = true;
      this.btn_class = 'btn_class';
      if (isProved) {
        this.btn_string = 'coc.detail.isProved';
      } else {
        this.btn_string = 'coc.detail.nproved';
      }

    } catch (err) {
      this.modalDetailsLoading = false;
      this.toasterService.pop('error', this.i18nService.instant('panel.message.error'), err);
    }
  }

  closeModal() {
    this.editModal.hide();
    this.isInitModal = false;
  }
  openModal(src: string) {
    this.editModal.show();
    this.isInitModal = true;
    this.imgSrc = src;
  }

}
