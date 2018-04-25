import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {ToasterService} from 'angular2-toaster';
import {I18nService} from '../../../common/i18n/i18n.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  details: any;
  modalDetailsLoading = false;
  constructor(private usersService: UsersService,
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
       const info = await this.usersService.find(id).toPromise();
      this.details = info.result;
      this.details.cocs = info.cocs;
      this.modalDetailsLoading = false;
    } catch (err) {
      this.modalDetailsLoading = false;
    }
  }

}
