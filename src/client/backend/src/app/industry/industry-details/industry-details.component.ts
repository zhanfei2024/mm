import { Component, OnInit } from '@angular/core';
import {IndustryService} from '../industry.service';
import {ToasterService} from 'angular2-toaster';
import {I18nService} from '../../../common/i18n/i18n.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './industry-details.component.html',
  styleUrls: ['./industry-details.component.scss']
})
export class IndustryDetailsComponent implements OnInit {

  details: any;
  modalDetailsLoading = false;
  constructor(private orderService: IndustryService,
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

}
