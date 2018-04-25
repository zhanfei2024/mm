import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {Auth} from '../auth.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {SeoService} from '../../../common/global/seo';
import {TranslateService} from '@ngx-translate/core';
import {ToasterService} from "angular2-toaster";
import {ChamberService} from "../../chamber-management/chamber.service";

@Component({
  templateUrl: './signup.component.html',
  providers: [ChamberService],
})
export class SignupComponent implements OnInit, AfterViewChecked {
  public email: string;
  public password: string;
  public confirmPassword: string;
  public signUpLoading: boolean = false;
  public confirmResult: boolean = true;
  public sigupRole: string = 'user';
  public passwordShow: boolean = false;
  public confirmPasswordShow: boolean = false;
  public checked: boolean = false;
  isRecaptcha: boolean = false;
  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.isRecaptcha = true;
    }
  }
  constructor(private auth: Auth,
              private seoService: SeoService,
              private translate: TranslateService,
              private toasterService: ToasterService,
              private chamberService: ChamberService,
              private router: Router,
              private location: Location) {
  }

  ngAfterViewChecked() {
    this.seoService.setTitle(this.translate.instant('auth.signup'), this.seoService.getTitleContent());
  }

  ngOnInit() {
    // this.auth.handleAuthentication();
  }
  setState(state: string): void {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.checked = false;
    switch (state) {
      case 'user':
        this.sigupRole = 'user';
        break;
      case 'coc':
        this.sigupRole = 'coc';
        break;
    }
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

  /**
   *用户注册
   */
  async userSignup(role: string) {
    if (this.isRecaptcha) {
      try {
        this.signUpLoading = true;
        await this.auth.signUp(role, this.email, this.password).toPromise();
        await this.auth.login(role, this.email, this.password).toPromise();
        this.router.navigate(['/user', 'info']);
        this.signUpLoading = false;
      } catch (err) {
        this.signUpLoading = false;
        this.toasterService.pop('error', 'Error', err.message);
      }
    }

  }
  async userEnterSignup(event: any, role: string) {
    if (event.keyCode === 13) {
      try {
        this.signUpLoading = true;
        await this.auth.signUp(role, this.email, this.password).toPromise();
        await this.auth.login(role, this.email, this.password).toPromise();
        this.router.navigate(['/user', 'info']);
        this.signUpLoading = false;
      } catch (err) {
        this.signUpLoading = false;
        this.toasterService.pop('error', 'Error', err.message);
      }
    }
  }
  /**
   *商会注册
   */
  async cocSignup(role: string) {
    this.signUpLoading = true;
    if (this.isRecaptcha) {
      try {
        await this.auth.signUp(role, this.email, this.password).toPromise();
        await this.auth.login(role, this.email, this.password).toPromise();
        this.getCoc();
        this.signUpLoading = false;
      } catch (err) {
        this.signUpLoading = false;
        this.toasterService.pop('err', 'Error', err.message);
      }
    }
  }
  async cocEnterSignup(event: any, role: string) {
    if (event.keyCode === 13) {
      this.signUpLoading = true;
      try {
        await this.auth.signUp(role, this.email, this.password).toPromise();
        await this.auth.login(role, this.email, this.password).toPromise();
        this.getCoc();
        this.signUpLoading = false;
      } catch (err) {
        this.signUpLoading = false;
        this.toasterService.pop('err', 'Error', err.message);
      }
    }
  }
  /**
   *获取
   */
  async getCoc(): Promise<any> {
    try {
      let data = await this.chamberService.getCoc({}).toPromise();
      if (data.result.length === 1 && data.result[0].isApproved) {
        this.router.navigate(['/chamber', data.result[0].id, 'home']);
        localStorage.setItem('chamber', data.result[0].id);
      } else if (data.result.length > 1 && !localStorage.getItem('chamber')) {
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
    this.confirmPasswordShow = !this.confirmPasswordShow;
    setTimeout(() => {
      this.passwordShow = !this.passwordShow;
      this.confirmPasswordShow = !this.confirmPasswordShow;
    }, 1000)
  }

}
