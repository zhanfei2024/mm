import { Component, OnInit , ViewChild} from '@angular/core';
import {CocService} from '../coc.service';
import {ToasterService} from 'angular2-toaster';
import {I18nService} from '../../../common/i18n/i18n.service';
import {ActivatedRoute} from '@angular/router';
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-order-details',
  templateUrl: './coc-details.component.html',
  styleUrls: ['./coc-details.component.scss']
})
export class CocDetailsComponent implements OnInit {

  details: any;
  modalDetailsLoading = false;
  isInitModal: boolean;
  @ViewChild('editModal') public editModal: ModalDirective;
  imgSrc: string;

  constructor(private orderService: CocService,
              private toasterService: ToasterService,
              private i18nService: I18nService,
              private activatedRoute: ActivatedRoute) { }

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

  closeModal() {
    this.editModal.hide();
    this.isInitModal = false;
  }
  openModal(src: string) {
    this.editModal.show();
    this.imgSrc = src;
    this.isInitModal = true;
  }

}
