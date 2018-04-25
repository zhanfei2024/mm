import {Injectable} from '@angular/core';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {HttpService} from '../../common/http/http.service';
import {AuthHttp} from 'angular2-jwt';
import {Subject} from "rxjs/Subject";

interface IIsActivate {
  isActivated: boolean;
}

@Injectable()
export class Auth {
  userProfile: Object;
  jwtHelper: JwtHelper = new JwtHelper();
  refreshSubscription: any;
  private subject = new Subject<boolean>();


  constructor(private httpService: HttpService,
              private router: Router,
              private authHttp: AuthHttp) {
  }

  nextToken(data: boolean) {
    this.subject.next(data);
  }

  getToken(): Observable<any> {
    return this.subject.asObservable();
  }

  /*注册*/
  public signUp(role: string, email: string, password: string): Observable<any> {
    const options = {
      email,
      password
    };
    return this.httpService
      .post(`${role}/auth/register`, options)
  }

  /*登录*/
  public login(role: string, email: string, password: string): Observable<any> {
    const optins = {
      email,
      password
    };
    sessionStorage.setItem('role', role);
    return this.httpService
      .post(`${role}/auth/login`, optins)
      .map(res => res.json().result)
      .map(res => {
        this.setUser(res);
        this.getNewJwt();
        this.startupTokenRefresh();
        return res
      });
  }

  /*忘记密码*/
  public forgetPassword(role: string, email: string): Observable<any> {
    const options = {
      email
    };
    sessionStorage.setItem('role', role);
    return this.httpService
      .post(`${role}/auth/forget-password`, options)
  }

  /*重置密码*/
  public resetPassword(role: string, email: string, password: string, token: string): Observable<any> {
    const options = {
      email,
      password,
      token
    };
    return this.httpService
      .post(`${role}/auth/reset-password`, options)
      .map(res => res.json().result);
  }

  //修改密码
  public changePassword(role: string, data: any): Observable<any> {
    return this.httpService
      .post(`${role}/auth/change-password`, data)
      .map(res => res.json().result);
  }

  /*退出*/
  public logout(): void {
    sessionStorage.removeItem('full_access_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('token_type');
    sessionStorage.removeItem('team');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('cocId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('language');
    sessionStorage.removeItem('isApproved');
    sessionStorage.removeItem('cocEmail');
    sessionStorage.removeItem('chamber');
    sessionStorage.removeItem('currentRole');
    sessionStorage.removeItem('isBack');
    localStorage.removeItem('full_access_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('team');
    localStorage.removeItem('role');
    localStorage.removeItem('cocId');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('language');
    localStorage.removeItem('isApproved');
    localStorage.removeItem('cocEmail');
    localStorage.removeItem('chamber');
    localStorage.removeItem('currentRole');
    localStorage.removeItem('isBack');
    this.userProfile = undefined;
    this.unscheduleRefresh();
    this.router.navigate(['/'])
  }

  /*保存用户token到本地*/
  public setUser(authResult): void {
    sessionStorage.setItem('token_type', authResult.tokenType);
    sessionStorage.setItem('access_token', authResult.accessToken);
    if (authResult.refreshToken) {
      sessionStorage.setItem('refresh_token', authResult.refreshToken)
    }
  }

  /*获取新token*/
  public getNewJwt(): any {
    try {
      const token = sessionStorage.getItem('access_token');
      if (this.jwtHelper.decodeToken(token).type === 'enterprise') {
        return this.httpService
          .post(`enterprise/auth/refresh`, {
            refreshToken: sessionStorage.getItem('refresh_token')
          })
          .map(res => res.json().result)
          .map(res => {
            this.setUser(res);
            return res;
          });
      } else {
        return this.httpService
          .post(`user/auth/refresh`, {
            refreshToken: sessionStorage.getItem('refresh_token')
          })
          .map(res => res.json().result)
          .map(res => {
            this.setUser(res);
            return res;
          });
      }
    } catch (err) {
      this.router.navigate(['/auth', 'login'])
    }
  }

  //按照计划刷新token，30分钟一次
  public scheduleRefresh() {
    if (this.isAuthenticated()) {
      try {
        const source = this.authHttp.tokenStream.flatMap(
          token => {
            // The delay to generate in this case is the difference
            // between the expiry time and the issued at time
            const jwtIat = this.jwtHelper.decodeToken(token).iat;
            const jwtExp = this.jwtHelper.decodeToken(token).exp;
            const iat = new Date(0);
            const exp = new Date(0);

            const delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat)) - 180000;

            return Observable.interval(delay);
          })
          .flatMap(() => {
            return this.getNewJwt();
          });

        this.refreshSubscription = source.subscribe(() => {
          //
        });
      } catch (err) {
        this.router.navigate(['/'])
      }
    }
  }

  /*开始刷新Token*/
  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    this.nextToken(this.isAuthenticated());
    if (this.isAuthenticated()) {

      try {
        const source = this.authHttp.tokenStream.flatMap(
          token => {
            // Get the expiry time to generate
            // a delay in milliseconds
            const now: number = +new Date().valueOf();
            const jwtExp: number = this.jwtHelper.decodeToken(token).exp;
            const exp: Date = new Date(0);
            exp.setUTCSeconds(jwtExp);

            let delay: number = exp.valueOf() - now - 300000;
            if (delay <= 0) {
              delay = 0;
            }
            // Use the delay in a timer to
            // run the refresh at the proper time
            return Observable.timer(delay);

          })
          .flatMap((result) => {
            return this.getNewJwt();
          });

        source.subscribe(() => {
          this.scheduleRefresh();
        });
      } catch (err) {
      }
    }
  }

  public unscheduleRefresh() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }


  public isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem('access_token');
    try {
      return accessToken ? tokenNotExpired('access_token', accessToken) : false;
    } catch (err) {
      sessionStorage.clear();
      return false;
    }
  }
}
