import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthRoutingModule} from './auth-routing-module';
import {LoginCheckResolve} from './login-check-resolve.service';


import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {CompanyLoginCheckResolve} from "./login-company-check-resolve.service";

import {SharedModule} from "../../common/shared/shared.module";
import {UserService} from "../user/user.service";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {AuthCarouselComponent} from "./auth-carousel/auth-carousel.component";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import {RecaptchaModule} from "ng-recaptcha";


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => sessionStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    RecaptchaModule.forRoot(),
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    LoginCheckResolve,
    CompanyLoginCheckResolve,
    UserService,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AuthCarouselComponent,
  ]
})
export class AuthModule {
}
