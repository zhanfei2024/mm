import {Component, OnInit, DoCheck} from '@angular/core';
import {UserService, Activity} from "../user.service";
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
  templateUrl: './user-activities.component.html'
})
export class UserActivitiesComponent implements OnInit, DoCheck {
  private searchTerms = new Subject<string>();
  public activities: Activity[];
  public filter: IFilter = {
    page: 1,
    limit: 4,
    sorting: '',
    search: '',
  };
  public userActivitiesMeta: IMeta = {pagination: {}};
  public selectedActivity;
  public activitiesLoading: boolean;
  public states: any[] = [ ];
  constructor(private user: UserService,
              private toasterService: ToasterService,
              private seoService: SeoService,
              private translateService: TranslateService) { }
  ngDoCheck() {
    this.seoService.setTitle(this.translateService.instant('user.navbar.my_activities'), this.seoService.getTitleContent());
    this.states = [
      `${this.translateService.instant('user.home.pending')}`,
      `${this.translateService.instant('user.home.success')}`,
      `${this.translateService.instant('user.home.fail')}`,
      `${this.translateService.instant('cocShow.home.whole')}`
    ];

  };
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit() {
    this.getActivityApplies('');
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => {
        this.filter.search = term;
        this.getActivityApplies(this.selectedActivity);
      })

  }
  /**
   *
   */
  selected(event: any): void {
    switch (event.text) {
      case `${this.translateService.instant('user.home.success')}`:
        this.selectedActivity = 'success';
        break;
      case `${this.translateService.instant('user.home.pending')}`:
        this.selectedActivity = 'pending';
        break;
      case `${this.translateService.instant('user.home.fail')}`:
        this.selectedActivity = 'fail';
        break;
      case `${this.translateService.instant('cocShow.home.whole')}`:
        this.selectedActivity = '';
        break;
    }
    this.getActivityApplies(this.selectedActivity);
  }
  /**
   *获取商会列表
   */
  async getActivityApplies(selected: string): Promise<any> {
    try {
      this.activitiesLoading = true;
      this.filter['status'] = selected;
      let data = await this.user.getActivityApplies(this.filter).toPromise();
      this.activitiesLoading = false;
      this.activities = data.result;
      this.userActivitiesMeta = data.meta;
    } catch (err) {
      this.activitiesLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *分页
   */
  async pageChanged(event: any) {
    this.filter.page = event.page;
    this.filter.limit = event.itemsPerPage;
    await this.getActivityApplies('');
  }

}
