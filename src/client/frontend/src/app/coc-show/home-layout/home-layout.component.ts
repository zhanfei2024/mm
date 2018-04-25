import {Component, OnInit, ViewChild} from '@angular/core';
import {ICoc, CocShowService} from "../coc-show.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalDirective} from "ngx-bootstrap";
import {ToasterService} from "angular2-toaster";
import {Auth} from "../../auth/auth.service";
import {Subscription} from 'rxjs/Subscription';
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {UserService} from "../../user/user.service";
import {I18nService} from "../../../common/i18n/i18n.service";

@Component({
  templateUrl: './home-layout.component.html',
  providers: [CocShowService, Auth]
})
export class HomeLayoutComponent implements OnInit {
  public subscription: Subscription;
  public cocSelf: ICoc;
  public cocId: string;
  public title: string = 'cocShow.navbar.apply_into_coc';
  public groups: any;
  public bank: any[] = [];
  public bankItem: any;
  public groupId: string;
  public bankId: string;
  public introducer: string;
  public step1: boolean = true;
  public submitLoading: boolean;
  public isIntroducer: boolean;
  public statement1: boolean = false;
  public statement2: boolean = false;
  public statement3: boolean = false;
  public tabs: any[];
  public positions: any[];
  public memberRatingId: string;
  @ViewChild('editModal') public editModal: ModalDirective;
  public config: SwiperConfigInterface = {
    pagination: '.swiper-pagination',
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 4,
  };
  public config2: SwiperConfigInterface = {
    pagination: '.swiper-pagination',
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 4,
  };

  constructor(private cocShowService: CocShowService,
              private userService: UserService,
              private route: ActivatedRoute,
              private toasterService: ToasterService,
              private i18n: I18nService,
              private router: Router,
              private auth: Auth) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    /**
     *获取路由参数id,调用方法
     */
    this.cocId = this.route.children[0].params['_value'].id;
    this.getCocSelf(this.cocId);
    this.getTabs(this.cocId);
    this.getPositions(this.cocId);
    this.reloadGroup(this.cocId);
    if (sessionStorage.getItem('role') === 'user') {
      this.chekIsApplay(this.cocId);
    }
    localStorage.setItem('cocId', this.cocId);
  }

  /**
   *
   * get tabs
   */
  async getTabs(id: string): Promise<any> {
    try {
      let data = await this.cocShowService.getTabs(id, {cocId: id}).toPromise();
      this.tabs = data.result;
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message)
    }
  }

  /**
   *获取指定id商会数据
   */
  async getCocSelf(id: string): Promise<any> {
    try {
      let data = await this.cocShowService.findCocSelf(id).toPromise();
      this.cocSelf = data;
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  /*
  * 获取职务
  */

  async getPositions(id: string): Promise<any> {
    try {
      let data = await this.cocShowService.getPositions(id).toPromise();
      this.positions = data.result;
    }catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  async chekIsApplay(id: string): Promise<any> {
    try {
      let data = await this.cocShowService.chekIsApply(id).toPromise();
      switch (data.status) {
        case 'false':
          this.title = 'cocShow.navbar.apply_into_coc';
          break;
        case 'true':
          this.title = 'cocShow.navbar.apply_coc';
          break;
        case 'applying':
          this.title = 'cocShow.navbar.pending_coc';
          break;
        case 'invited':
          this.title = 'cocShow.navbar.invited_coc';
          break;
      }

    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  async openModel() {
    if (this.auth.isAuthenticated() && sessionStorage.getItem('role') === 'user') {
      /*判断用户是否是会员*/
      let checkIsMember = this.cocShowService.chekIsApply(this.cocId).toPromise();
      if (!checkIsMember['status']) {
        let userInfo = await this.userService.getProfile().toPromise();
        let userCompany = await this.userService.getCompany().toPromise();
        if (!userInfo.result['phone'] || !userInfo.result['avatar'] || !userCompany.result.length) {
          let infoText = userInfo.result['phone'] === null ? 'global.userInfo' : '';
          let avatarText = userInfo.result['avatar'] === null ? 'global.userAvatar' : '';
          let companyTetx = userCompany.result.length === 0 ? 'global.userCompany' : '';
          let textArr = [infoText, avatarText, companyTetx];
          let filterArrText = [];
          textArr.forEach(item => {
            if (item) {
              filterArrText.push(this.i18n.instant(item))
            }
          });
          let message = filterArrText.join();
          this.toasterService.pop('err', 'err', `${this.i18n.instant('global.input')}${message}${this.i18n.instant('global.enter-coc')}`);
          this.router.navigate(['/user', 'info']);
        } else {
          this.editModal.show();
          this.reloadGroup(this.cocId);
          this.reloadBank(this.cocId);
        }
      }
    } else {
      this.router.navigate(['/auth/login'])
    }
  }

  async reloadGroup(id: string) {
    try {
      let data = await this.cocShowService.getGroup(id, {}).toPromise();
      this.groups = data.result;
    } catch (err) {
    }
  }

  async reloadBank(id: string) {
    try {
      let data = await this.cocShowService.getBank(id, {}).toPromise();
      this.bank = data.result;
      this.bankItem = data.result[0];
      this.bankId = data.result[0].id;
    } catch (err) {
    }
  }

  next() {
    this.step1 = !this.step1;
  }

  selected(data: any, group: string) {
    if (group === 'group') {
      this.groupId = data.id;
    } if (group === 'position') {
      this.memberRatingId = data.id;
      this.positions.forEach(value => {
        value['active'] = value.title === data.title ? true : false;
      });
    } else {
      this.bankId = data.id;
      this.bankItem = data;
    }
  }

  async onSubmit() {
    try {
      this.submitLoading = true;
      await this.cocShowService.applyCoc(this.cocId, {
        groupId: this.groupId,
        introducer: this.introducer,
        statement1: this.statement1,
        statement2: this.statement2,
        statement3: this.statement3,
        memberRatingId: this.memberRatingId,
      }).toPromise();
      this.toasterService.pop('success', 'success', 'success');
      this.step1 = false;
      this.submitLoading = false;
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'Error', err.message);
    }
  }

  link() {
    this.editModal.hide();
    this.chekIsApplay(this.cocId);
  }

}
