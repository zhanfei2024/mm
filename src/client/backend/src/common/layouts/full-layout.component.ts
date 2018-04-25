import {Component, OnDestroy, OnInit} from '@angular/core';
import {Auth} from '../../app/auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {Observable} from 'rxjs';
import {HttpService} from '../http/http.service';
import {SeoService} from '../global/seo';
import {JwtHelper} from 'angular2-jwt';
import {GlobalSettingObservableService, SelfObservableService} from '../global/global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css'],
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  language: string = localStorage.getItem('language');

  // token
  jwtHelper: JwtHelper = new JwtHelper();
  self: any = {};
  navIndex: number;

  public lastIndex = 0;

  constructor(private auth: Auth,
              private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private seoService: SeoService,
              private SelfObservableService: SelfObservableService,
              private GlobalSettingObservableService: GlobalSettingObservableService) {
  }

  ngOnInit(): void {
    this.GlobalSettingObservableService.setLanguage(this.language);
  }

  goManager(): void {
    this.router.navigate(['/manager/user-list']);
  }


  ngOnDestroy(): void {
    this.seoService.setTitle('Web');
  }

  public setLanguage(num: string) {
    let lang: string;
    if (num === '1') {
      lang = 'en-us'
    }
    if (num === '2') {
      lang = 'zh-hk'
    }
    if (num === '3') {
      lang = 'zh-cn'
    }
    this.language = lang;
    this.GlobalSettingObservableService.setLanguage(lang);

  }

  public logout(): void {
    this.auth.logout();
    location.reload();
  }


  toggleNav(index: number) {
    if (index !== this.navIndex) {
      this.navIndex = index;
    }
  }
}
