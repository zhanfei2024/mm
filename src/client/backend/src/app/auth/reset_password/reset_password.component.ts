import {Component, OnInit} from '@angular/core';
import {Auth} from '../auth.service';
import {ToasterService} from 'angular2-toaster/angular2-toaster';
import {Router, ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';

@Component({
  templateUrl: './reset_password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  email: any;
  password: string;
  confirm_password: string;
  token: any;
  Loading = false;
  isSet = false;

  constructor(private auth: Auth,
              private toasterService: ToasterService,
              private router: Router,
              private _location: Location,
              private translateService: TranslateService,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(
      data => {
        this.email = data['email'];
      });

    this.route.queryParams.subscribe(
      data => {
        this.token = data['token'];
      });
  }


  ngOnInit() {
  }

  translate(str: string) {
    return this.translateService.instant(str);
  }

  async save() {
    this.Loading = true;
    try {
      await this.auth.resetPassword(this.email, this.password, this.token).toPromise();
      this.Loading = false;
      this.toasterService.pop('success', this.translate('panel.message.success'), this.translate('auth.message.reset_password_msg'));
      this.isSet = true;
    } catch (err) {
      this.toasterService.pop('error', this.translate('panel.message.error'), err.message);
      this.Loading = false;
    }
  }

  goBack(): void {
    this._location.back();
  }

}
