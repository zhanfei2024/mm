import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {Auth} from "../auth.service";
import {Location} from "@angular/common";
import {ToasterService} from "angular2-toaster";
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit,  AfterViewChecked {
  public email: string;
  public forgetLoading: boolean = false;
  public submit: boolean = false;
  public loginLoading: boolean = false;
  public role: string;
  public password: string;
  public confirmPassword: string;
  public confirmResult: boolean = true;
  public token: any;
  constructor(private auth: Auth,
              private translate: TranslateService,
              private seoService: SeoService,
              private toasterService: ToasterService,
              private location: Location,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(
      date => {
        this.email = date['email'];
      }
    );
    this.route.queryParams.subscribe(
      date => {
        this.token = date['token']
      }
    )
  }
  ngOnInit() {
    this.role = localStorage.getItem('forgetRole');
  }
  ngAfterViewChecked() {
    this.seoService.setTitle(this.translate.instant('auth.modify'), this.seoService.getTitleContent());
  }
  save() {
    this.isUserExist();
  }
  back(): void {
    this.location.back();
  }
  /**
   *密码确认
   */
  compare(): void {
    if (this.password === this.confirmPassword) {
      this.confirmResult = true;
    } else {
      this.confirmResult = false;
    }
  }

  async restPassword(role: string) {
    this.forgetLoading = true;
    try {
      await this.auth.resetPassword(role, this.email, this.password, this.token).toPromise();
      this.forgetLoading = false;
      this.submit = true;
      this.toasterService.pop('success', 'Success', this.translate.instant('重置成功'));
    } catch (err) {
      this.forgetLoading = false;
      this.toasterService.pop('error', 'Error', err.message);
    }
  }

  async isUserExist() {
    try {
      // await this.auth.isUserExist({email: this.email}).toPromise();
      this.restPassword('enterprise');
    } catch (err) {
      this.toasterService.pop('error', 'Error', this.translate.instant('message.user_login_not_exists'));
    }
  }

}
