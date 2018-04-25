import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {LoginComponent} from './login/login.component';
import {Auth} from './auth.service';
import {SharedModule} from '../../common/shared/shared.module';
import {LoginCheckResolve} from './login-check-resolve.service';
import { SignupComponent } from './signup/signup.component';
import {UserService} from '../user/user.service';
import {ForgetPasswordComponent} from './forget_password/forget_password.component';
import {ResetPasswordComponent} from './reset_password/reset_password.component';


import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    LoginCheckResolve,
    UserService
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule {
}
