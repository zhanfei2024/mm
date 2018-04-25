import { Component, OnInit } from '@angular/core';
import {ActivityAttachmentsService} from '../activity-attachments.service';
import {ToasterService} from 'angular2-toaster';
import {I18nService} from '../../../common/i18n/i18n.service';

@Component({
  templateUrl: './activity-attachments-details.component.html',
  styleUrls: ['./activity-attachments-details.component.scss']
})
export class ActivityAttachmentsDetailsComponent implements OnInit {

  details: any;
  modalDetailsLoading = false;
  constructor(private orderService: ActivityAttachmentsService,
              private toasterService: ToasterService,
              private i18nService: I18nService) { }

  ngOnInit() {
  }


}
