import { Component, OnInit } from '@angular/core';
import {ActivityCategoryService} from '../activity-category.service';
import {ToasterService} from 'angular2-toaster';
import {I18nService} from '../../../common/i18n/i18n.service';

@Component({
  templateUrl: './activity-category-details.component.html',
  styleUrls: ['./activity-category-details.component.scss']
})
export class ActivityCategoryDetailsComponent implements OnInit {

  details: any;
  modalDetailsLoading = false;
  constructor(private orderService: ActivityCategoryService,
              private toasterService: ToasterService,
              private i18nService: I18nService) { }

  ngOnInit() {
  }


}
