import { Component, OnInit } from '@angular/core';
import {Auth} from "../auth.service";
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";
import { ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent implements OnInit {
  public email: string;
  public password: string;

  public loginLoading: boolean = false;
  public loading: boolean = false;
  public submit: boolean = false;
  constructor(private auth: Auth,
              private toasterService: ToasterService,
              private translateService: TranslateService,
              private location: Location,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.queryParams.subscribe(
      date => {
        this.email = date['email'];
      }
    );
  }
  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  /**
   *忘记密码
   */
  async forgetPassword() {
    const role = localStorage.getItem('currentRole') ?  localStorage.getItem('currentRole') : 'user';
    this.loading = true;
    try {
      await this.auth.forgetPassword(role, this.email).toPromise();
      this.loading = false;
      this.toasterService.pop('success', 'Success', `${this.translateService.instant('密码重置成功')}`);
      this.router.navigate(['/auth', 'rest-password'])
    } catch (err) {
      this.loading = false;
      this.toasterService.pop('error', 'Error', err.message);
    }
  }
}

