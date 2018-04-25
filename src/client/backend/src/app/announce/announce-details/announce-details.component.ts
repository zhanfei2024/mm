import { Component, OnInit } from '@angular/core';
import {AnnounceService} from '../announce.service';
import {ToasterService} from 'angular2-toaster';
import {I18nService} from '../../../common/i18n/i18n.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './announce-details.component.html',
  styleUrls: ['./announce-details.component.scss']
})
export class AnnounceDetailsComponent implements OnInit {

  details: any;
  modalDetailsLoading = false;
  constructor(private orderService: AnnounceService,
              private toasterService: ToasterService,
              private i18nService: I18nService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.showOrderDetails(this.activatedRoute.snapshot.params.id, this.activatedRoute.snapshot.params.cocId);
  }

  // 显示订单详情
  async showOrderDetails(id: string, cocId:string): Promise<any> {
    try {
      this.modalDetailsLoading = true;
      this.details = await this.orderService.find(id,cocId).toPromise();
      this.modalDetailsLoading = false;
    } catch (err) {
      this.modalDetailsLoading = false;
      this.toasterService.pop('error', this.i18nService.instant('panel.message.error'), err);
    }
  }

}
