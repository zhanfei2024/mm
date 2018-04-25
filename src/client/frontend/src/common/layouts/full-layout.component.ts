import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Auth } from '../../app/auth/auth.service';
import { Router } from '@angular/router';
import { SeoService } from '../global/seo';
import { I18nService } from "../i18n/i18n.service";
import {
  ChamberSettledService,
  Enterprises
} from "../../app/chamber-management/chamber-settled/post/chamber-settled.service";
import { ChamberService } from "../../app/chamber-management/chamber.service";
import { ModalDirective } from "ngx-bootstrap";
import * as _ from "lodash";
import { ToasterService } from "angular2-toaster";
import { TranslateService } from '@ngx-translate/core';
import { GlobalSettingObservableService } from "../global/global";
import { HomeService } from "../../app/home/home.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [I18nService, ChamberService, ChamberSettledService]
})
export class FullLayoutComponent implements OnInit {
  public isMemberLogin: boolean = false;
  public isHome: boolean = false;
  private currentState: string;
  public isCollapsed: boolean = false;
  public submitLoading: boolean = false;
  public resetLoading: boolean = false;
  public isLang: boolean = false;
  public isCollapsedLogion: boolean = false;
  public settings: any;
  public search: string;
  public enterprises: any = new Enterprises();
  public isLogin: boolean;
  public url: any[] = [];
  @ViewChild('dataModal') dataModal: ModalDirective;
  @ViewChild('resetModal') resetModal: ModalDirective;
  @ViewChild('header') header: ElementRef;
  language: string;
  public oldPassword: string;
  public password: string;
  public verifyPassword: string;

  public hotCocs: any[] = [];
  public topSearchBarShow: boolean = false;

  constructor(private auth: Auth,
    private router: Router,
    private toasterService: ToasterService,
    private chamberSettledService: ChamberSettledService,
    private chamberService: ChamberService,
    private translate: TranslateService,
    private homeService: HomeService,
    private globalSettingObservableService: GlobalSettingObservableService,
    private seoService: SeoService) {
    window.onscroll = () => {
      //变量t是滚动条滚动时，距离顶部的距离
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      //当滚动到距离顶部0px时，
      if (t === 0) {
        this.header.nativeElement.className = 'cocNavbar';
        this.topSearchBarShow = false;
      } if (t > 0) {
        this.header.nativeElement.className = 'cocNavbar fixed';
        this.topSearchBarShow = false;
      } if (t > 310) {
        this.topSearchBarShow = true;
      }
    }

  }

  ngOnInit(): void {
    this.currentState = 'notLogin';
    if (location.hash === '#/') {
      this.isHome = true;
    }
    if (_.isNil(localStorage.getItem('language'))) {
      this.language = localStorage.getItem('lang');
      this.translate.use(this.language);
    } else {
      this.language = 'hk';
    }
    this.auth.getToken().subscribe((data: any) => {
      if (sessionStorage.getItem('role') === 'enterprise') {
        this.isLogin = data;
        this.isMemberLogin = false;
        this.getCoc();
      }
      if (sessionStorage.getItem('role') === 'user') {
        this.isMemberLogin = data;
        this.isLogin = false;
      }
    });


    if (this.auth.isAuthenticated() && sessionStorage.getItem('role') === 'enterprise') {
      this.isLogin = true;
      this.isMemberLogin = false;
      this.getCoc();
    }
    if (this.auth.isAuthenticated() && sessionStorage.getItem('role') === 'user') {
      this.isMemberLogin = true;
      this.isLogin = false;
    }
    this.getHotCocs();
    this.getSettings();
  }

  async getCoc(): Promise<any> {
    try {
      let data = await this.chamberService.getCoc({}).toPromise();
      if (data.result.length > 0) {
        this.url = ['/chamber', 'select'];
      } else {
        this.url = ['/coc', 'settled'];
      }
      this.globalSettingObservableService.nextCoc(data.result);
      this.globalSettingObservableService.cocs = data.result;
    } catch (err) {

    }
  }

  async logout() {
    try {
      await this.auth.logout();
      this.router.navigate(['/home', 'index']);
      this.isMemberLogin = false;
      this.toasterService.pop('success', 'success', '退出成功');
      location.reload();
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message)
    }
  }

  openModel() {
    this.dataModal.show();
    this.getEnterprises();
  }

  async getEnterprises(): Promise<any> {
    try {
      let data = await this.chamberSettledService.getEnterprises({}).toPromise();
      this.enterprises = data.result;
      this.enterprises['credit'] = 1;
    } catch (err) {

    }
  }

  public setLanguage(num: string) {
    let lang: string;
    if (num === '3') {
      lang = 'en'
    }
    if (num === '2') {
      lang = 'hk'
    }
    if (num === '1') {
      lang = 'cn'
    }
    this.language = lang;
    this.globalSettingObservableService.setLanguage(lang);

  }

  async onSubmit() {
    try {
      this.submitLoading = true;
      await this.chamberSettledService.updateEnterprises(this.enterprises).toPromise();
      this.toasterService.pop('success', 'Success', 'Success');
      this.submitLoading = false;
      this.dataModal.hide();
    } catch (err) {
      this.submitLoading = true;
      this.toasterService.pop('error', 'error', err.message);
    }
  }

  onSearch(name: string) {
    this.router.navigate([`/coc-list`], { queryParams: { search: name } });
  }

  async onReset() {
    try {
      this.resetLoading = true;
      await this.auth.changePassword(sessionStorage.getItem('role'),
        {
          oldPassword: this.oldPassword,
          password: this.password,
          verifyPassword: this.verifyPassword
        }
      ).toPromise();
      this.toasterService.pop('success', 'Success', 'Success');
      this.resetLoading = false;
      this.resetModal.hide();
      this.logout();
    } catch (err) {
      this.resetLoading = true;
      this.toasterService.pop('error', 'error', err.message);
    }
  }


  async getHotCocs(): Promise<any> {
    try {
      let data = await this.homeService.getLink({}).toPromise();
      this.hotCocs = data.result;
    } catch (err) {
    }
  }

  async getSettings(): Promise<any> {
    try {
      let data = await this.homeService.getSetting({}).toPromise();
      this.settings = data.result;
    } catch (err) {
    }
  }





}
