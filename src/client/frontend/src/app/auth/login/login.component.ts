import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Auth } from '../auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SeoService } from '../../../common/global/seo';
import { TranslateService } from '@ngx-translate/core';
import { ChamberService } from "../../chamber-management/chamber.service";
import { ToasterService } from "angular2-toaster";

@Component({
  templateUrl: './login.component.html',
  providers: [ChamberService]
})
export class LoginComponent implements OnInit, AfterViewChecked {
  userEmail: string;
  userPassword: string;
  cocEmail: string;
  cocPassword: string;
  loginLoading: boolean = false;
  public loginRole: string = 'user';
  public passwordShow: boolean = false;


  constructor(private auth: Auth,
    private translate: TranslateService,
    private seoService: SeoService,
    private router: Router,
    private toasterService: ToasterService,
    private chamberService: ChamberService,
    private location: Location) {

  }

  ngAfterViewChecked() {
    this.seoService.setTitle(this.translate.instant('auth.login'), this.seoService.getTitleContent());
  }

  ngOnInit() {

  }

  /**
   *用户登录和商会登录切换
   */
  setState(state: string): void {
    switch (state) {
      case 'user':
        this.loginRole = 'user';
        localStorage.setItem('currentRole', 'user');
        break;
      case 'coc':
        this.loginRole = 'coc';
        localStorage.setItem('currentRole', 'coc');
        break;
    }
  }

  /**
   *用户登录
   */
  async userLogin(role: string) {
    this.loginLoading = true;
      try {
        if (this.auth.isAuthenticated()) {
          sessionStorage.clear();
        }
        await this.auth.login(role, this.userEmail, this.userPassword).toPromise();
        localStorage.setItem('userEmail', this.userEmail);
        if (localStorage.getItem('isBack')) {
          this.location.back();
          localStorage.removeItem('isBack');
        } else {
          this.router.navigate(['/user', 'info']);
        }
        this.loginLoading = false;
      } catch (err) {
        this.loginLoading = false;
        this.toasterService.pop('error', 'rror', err.message);
      }
  }

  /**
   *商会登录
   */
  async cocLogin(role: string) {
    this.loginLoading = true;
      try {
        if (this.auth.isAuthenticated()) {
          sessionStorage.clear();
        }
        await this.auth.login(role, this.cocEmail, this.cocPassword).toPromise();
        localStorage.setItem('cocEmail', this.cocEmail);
        this.getCoc();
        this.loginLoading = false;
      } catch (err) {
        this.loginLoading = false;
        this.toasterService.pop('error', 'Error', err.message);
      }
  }

  async cocEnterLogin(event: any, role: string) {
    if (event.keyCode === 13) {
      this.loginLoading = true;
      try {
        await this.auth.login(role, this.cocEmail, this.cocPassword).toPromise();
        localStorage.setItem('cocEmail', this.cocEmail);
        this.getCoc();
        this.loginLoading = false;
      } catch (err) {
        this.loginLoading = false;
        this.toasterService.pop('err', 'Error', err.message);
      }
    }
  }

  async getCoc(): Promise<any> {
    try {
      let data = await this.chamberService.getCoc({}).toPromise();
      if (data.result.length === 1 && data.result[0].isApproved) {
        this.router.navigate(['/chamber', data.result[0].id, 'home']);
        localStorage.setItem('chamber', data.result[0].id);
      } else if (data.result.length >= 1) {
        this.router.navigate(['/chamber', 'select']);
      } else if (data.result.length === 0) {
        this.router.navigate(['/coc', 'settled']);
      }
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  /**
   *忘记密码
   */
  forgetPassword(role: string): void {
    switch (role) {
      case 'user':
        localStorage.setItem('forgetRole', 'user');
        this.router.navigate(['/auth', 'forget-password']);
        break;
      case 'enterprise':
        localStorage.setItem('forgetRole', 'user');
        this.router.navigate(['/auth', 'forget-password']);
        break;
    }
  }

  /**
   *密码显示时限控制
   */
  passwordState(): void {
    this.passwordShow = !this.passwordShow;
    setTimeout(() => {
      this.passwordShow = !this.passwordShow;
    }, 1000)
  }
}
