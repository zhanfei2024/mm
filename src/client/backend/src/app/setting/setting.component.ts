import {Component, OnInit, ViewChild} from '@angular/core';
import {Config} from "../../common/config/config";
import {TranslateService} from "@ngx-translate/core";
import {ToasterService} from "angular2-toaster";
import {Setting, SettingService} from "./setting.service";
import * as _ from 'lodash';

@Component({
  templateUrl: './setting.component.html'
})

export class SettingComponent implements OnInit {
  public rows: any;
  @ViewChild('course') courses;
  public submitLoading: boolean;
  public courseUrl: string;
  public funcName: string;
  public editCourseUrl: string;
  public fileName: string;

  constructor(private settingService: SettingService,
              private toasterService: ToasterService,
              private translate: TranslateService,
              private config: Config) {
  }

  ngOnInit() {
    this.readTables();
    this.rows = new Setting();
  }

  async readTables(): Promise<any> {
    try {
      const data = await this.settingService.get({}).toPromise();
      if (!_.isUndefined(data.result.global)) {
        this.rows = data.result.global;
        this.courseUrl = data.result.logoUrl;
      } else {
        this.rows = new Setting();
      }
    } catch (err) {
    }
  }

  editCountChange(event) {
    if (_.isUndefined(this.rows.id)) {
      this.courseUrl = event.url;
    } else {
      this.editCourseUrl = event.url;
    }
  }

  async onSubmit() {
    try {
      this.submitLoading = true;
      this.courses.authToken = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;
      this.courses.form = {
        "title": this.rows.title,
        "name": this.rows.name,
        "description": this.rows.description,
        "keywords": this.rows.keywords,
        "footer": this.rows.footer,
        "statisticsCode": this.rows.statisticsCode,
      };
      this.courses.url = `${this.config.apiEndPoint}admin/setting`;
      await this.courses.upload('PUT');
      this.toasterService.pop('success', 'Success', this.translate.instant('panel.message.update_message'));
      this.submitLoading = false;
    } catch (err) {
      this.toasterService.pop('error', 'error', err.message);
      this.submitLoading = false;
    }
  }


}
