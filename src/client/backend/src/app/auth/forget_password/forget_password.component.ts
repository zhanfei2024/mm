import {Component, OnInit} from '@angular/core';
import {Auth} from '../auth.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Location} from '@angular/common';

@Component({
  templateUrl: './forget_password.component.html'
})
export class ForgetPasswordComponent implements OnInit {

  email: string;
  password: string;
  Loading = false;
  isSet = false;

  constructor(private auth: Auth,
              private toasterService: ToasterService,
              private router: Router,
              private _location: Location,
              private translateService: TranslateService) {
  }


  ngOnInit() {
  }

  translate(str: string) {
    return this.translateService.instant(str);
  }

  async save() {
    this.Loading = true;
    try {
      await this.auth.forgetPassword(this.email).toPromise();
      this.Loading = false;
      this.isSet = true;
      this.toasterService.pop('success', this.translate('panel.message.success'), this.translate('auth.message.mail_sent_msg'));
    } catch (err) {
      this.toasterService.pop('error', this.translate('panel.message.error'), err.message);
      this.Loading = false;
      this.isSet = false;
    }
  }

  goBack(): void {
    this._location.back();
  }

}
