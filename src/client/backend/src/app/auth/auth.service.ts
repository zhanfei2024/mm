import {Injectable, Inject} from '@angular/core';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Router, Route} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthConfig} from '../../common/config/auth.config';
import {HttpService} from '../../common/http/http.service';
import {AuthHttp, AuthConfig as JWTAuthConfig} from 'angular2-jwt';

interface IIsActivate {
  isActivated: boolean;
}

@Injectable()
export class Auth {

  userProfile: Object;
  jwtHelper: JwtHelper = new JwtHelper();
  refreshSubscription: any;

  constructor(public authHttp: AuthHttp,
              private httpService: HttpService,
              private router: Router,
              private authConfig: AuthConfig) {
  }

  public popupForgetPassword() {

  }

  isActivate(): Observable<IIsActivate> {
    return this.httpService
      .post('t/is_activated', {})
      .map(res => res.json().result)
  }

  public signUp(email: string, password: string, languageId: number): Observable<any> {
    const options = {
      email,
      password,
      languageId
    };
    return this.httpService
      .post(`t/auth/register`, options)
      .map(res => res.json().result);

  }

  public login(email: string, password: string): Observable<any> {
    const options = {
      email,
      password
    };

    return this.httpService
      .post(`admin/auth/login`, options)
      .map(res => res.json().result)
      .map(res => {
        this.setUser(res);
        this.getNewJwt();
        this.scheduleRefresh();
        return res;
      });
  }

  public forgetPassword(email: string): Observable<any> {
    const options = {
      email
    };
    return this.httpService
      .post(`admin/auth/forget_password`, options)
      .map(res => res.json().result);

  }

  public resetPassword(email: string, password: string, token: string): Observable<any> {
    const options = {
      email,
      password,
      token
    };
    return this.httpService
      .post(`admin/auth/reset_password`, options)
      .map(res => res.json().result);
  }

  public modifyPassword(oldPassword: string, password: string): Observable<any> {
    const options = {
      oldPassword,
      password
    };
    return this.httpService
      .post(`admin/auth/change_password`, options)
      .map(res => res.json().result);

  }

  public setUser(authResult): void {
    localStorage.setItem('token_type', authResult.tokenType);
    localStorage.setItem('access_token', authResult.accessToken);
    if (authResult.refreshToken) localStorage.setItem('refresh_token', authResult.refreshToken);
  }

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    try {
      return accessToken ? tokenNotExpired('access_token', accessToken) : false;
    } catch (err) {
      localStorage.clear();
      return false;
    }
  }

  public logout(): void {
    localStorage.removeItem('full_access_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('storeId');
    this.userProfile = undefined;

    this.unscheduleRefresh();
  }

  public scheduleRefresh() {
    try {
      const self = this;
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
      this.router.navigate(['/auth/login']);
    }
  }

  public startupTokenRefresh() {
    // console.log(`startupTokenRefresh!`);
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.isAuthenticated()) {
      try {
        const source = this.authHttp.tokenStream.flatMap(
          token => {
            // Get the expiry time to generate
            // a delay in milliseconds
            const now: number = new Date().valueOf();
            const jwtExp: number = this.jwtHelper.decodeToken(token).exp;
            const exp: Date = new Date(0);
            exp.setUTCSeconds(jwtExp);

            let delay: number = exp.valueOf() - now - 300000;
            if (delay <= 0) delay = 0;
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
    if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
  }

  public getNewJwt(): any {
    try {
      const token = localStorage.getItem('access_token');
      if (this.jwtHelper.decodeToken(token).type === 'admin') {
        return this.httpService
          .post(`manager/auth/refresh`, {
            refreshToken: localStorage.getItem('refresh_token')
          })
          .map(res => res.json().result)
          .map(res => {
            this.setUser(res);
            return res;
          });
      } else {
        return this.httpService
          .post(`admin/auth/refresh`, {
            refreshToken: localStorage.getItem('refresh_token'),
          })
          .map(res => res.json().result)
          .map(res => {
            this.setUser(res);
            return res;
          });
      }
    } catch (err) {
      // console.log(err, 'refresh token failed next');
      this.router.navigate(['/auth/login']);
    }
  }

  public isJoined(teamId: string): Observable<any> {
    const options = {};
    return this.httpService
      .post(`t/teams/${teamId}/is_joined`, options)
      .map(res => res.json().result);
  }
}
