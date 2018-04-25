import {Component, OnInit, DoCheck} from '@angular/core';
import {UserService, Coc} from "../user.service";
import {ToasterService} from "angular2-toaster";
import {IFilter, IMeta} from "../../../common/http/http.service";
import {SeoService} from "../../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
@Component({
  templateUrl: './user-coc.component.html'
})
export class UserCocComponent implements OnInit, DoCheck {
  private searchTerms = new Subject<string>();
  public filter: IFilter = {
    page: 1,
    limit: 4,
    sorting: '',
    search: '',
  };
  public userCocMeta: IMeta = {pagination: {}};
  public cocs: Coc[];
  public state: string = '';
  public cocAppliesLoading: boolean;
  public states: any[] = [ ];
  constructor(private user: UserService,
              private toasterService: ToasterService,
              private seoService: SeoService,
              private translateService: TranslateService) { }
  ngDoCheck() {
    this.seoService.setTitle(this.translateService.instant('user.navbar.My_coc'), this.seoService.getTitleContent());
    this.states = [
      `${this.translateService.instant('user.user_baseinfo.wait_join')}`,
      `${this.translateService.instant('user.home.already_joined')}`,
      `${this.translateService.instant('user.home.fail')}`,
      `${this.translateService.instant('cocShow.home.whole')}`
    ];
  }
  /**
   *搜索
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit() {
    this.getCocApplies('');
    this.searchTerms
      .debounceTime(300)                //每次击键后等待300毫秒，然后再考虑这个搜索词
      .distinctUntilChanged()           //如果下一个搜索词与之前相同，则忽略
      .subscribe(term => {
        this.filter.search = term;
        this.getCocApplies(this.state);
      });
  }

  /**
   *下拉框事件
   */
  selected(event: any): void {
    switch (event.text) {
      case `${this.translateService.instant('user.user_baseinfo.wait_join')}`:
        this.state = 'pending';
        break;
      case `${this.translateService.instant('user.home.already_joined')}`:
        this.state = 'success';
        break;
      case `${this.translateService.instant('user.home.fail')}`:
        this.state = 'fail';
        break;
      case `${this.translateService.instant('cocShow.home.whole')}`:
        this.state = '';
        break;
    }
    this.getCocApplies(this.state);
  }
  /**
   *申请列表
   */
  async getCocApplies(selected?: string): Promise<any> {
    try {
      this.cocAppliesLoading = true;
      this.filter['status'] = selected;
      let data = await this.user.getCocApplies(this.filter).toPromise();
      this.cocAppliesLoading = false;
      this.cocs = data.result;
      this.userCocMeta = data.meta;
    } catch (err) {
      this.cocAppliesLoading = false;
      this.toasterService.pop('err', 'Error', err.message);
    }
  }
  /**
   *分页
   */
  async pageChanged(event: any) {
    this.filter.page = event.page;
    this.filter.limit = event.itemsPerPage;
    await this.getCocApplies('');
  }
}
