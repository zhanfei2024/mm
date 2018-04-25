import 'rxjs/add/operator/switchMap';
import {Component, DoCheck, OnInit} from '@angular/core';
import {HomeService} from "../home/home.service";
import {IMeta, IFilter} from "../../common/http/http.service";
import * as _ from "lodash";
import * as moment from "moment";
import {SeoService} from "../../common/global/seo";
import {TranslateService} from "@ngx-translate/core";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './activity-list.component.html',
})
export class ActivityListComponent implements OnInit, DoCheck {
  public filter: IFilter = {
    page: 1,
    limit: 9,
    sorting: '',
    search: '',
    states: [],
    status: '',
    categoryIds: []
  };
  public activities: any[] = [];
  public activitiesCategories: any[] = [];
  public meta: IMeta = {pagination: {}};
  public metaCategories: IMeta = {pagination: {}};
  public dateActivityStart: string;
  public dateActivityEnd: string;
  public currentDate: string;
  public tableLoading: boolean;
  public isMore: boolean = false;
  public states: any[] = [];
  public status: any[];

  constructor(private homeService: HomeService,
              private seoService: SeoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private translate: TranslateService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(`${this.translate.instant('navbar.activity_list')}_${this.translate.instant('global.coc_title')}`, this.seoService.getTitleContent());
    this.seoService.setKeyWords(`${this.translate.instant('navbar.activity_list')}`);
    this.seoService.setDescription(`${this.translate.instant('global.coc_activity_description')}`);

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.status = [
      {
        state: '',
        name: 'global.unlimited',
        id: 1
      },
      {
        state: 'sign-up',
        name: 'cocShow.home.sign-up',
        id: 2
      },
      {
        state: 'in-process',
        name: 'cocShow.home.in-process',
        id: 3
      },
    ];
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.filter.status = !_.isUndefined(queryParams['states']) ? queryParams['states'] : '';
      this.filter.categoryIds = !_.isUndefined(queryParams['categories']) ? queryParams['categories'].split(',') : [];
      this.searchSelect('states', this.status);
      this.status = this.status.map(value => {
        if (value.state === this.filter.status) {
          value['selected'] = true;
          return value;
        } else {
          value['selected'] = false;
          return value;
        }
      })
      this.getActivities();
    });
    this.getActivitiesCategories();
    this.currentDate = moment().format('YYYY-MM-DD');
    this.dateActivityStart = _.isNull(this.dateActivityStart) ? '' : moment(this.dateActivityStart).format('YYYY-MM-DD');
    this.dateActivityEnd = _.isNull(this.dateActivityEnd) ? '' : moment(this.dateActivityEnd).format('YYYY-MM-DD');
  }

  more(): void {
    this.isMore = !this.isMore;
  }

  searchSelect(name: string, item: any) {
    if (item.length > 0) {
      _.each(this.filter[name], (val) => {
        let i = _.findIndex(item, (value) => {
          return value.id === _.toNumber(val)
        });
        if (i !== -1) {
          item[i]['selected'] = true;
        }
      });
    }
  }

  /**
   *按条件查找
   */
  selected(item: any, type: string): void {
    switch (type) {
      case 'status':
        // let statusIndex = _.indexOf(this.filter.states, _.toString(item.id));
        // if (statusIndex === -1) {
        //   item['selected'] = true;
        //   this.filter.states.push(_.toString(item.id))
        // } else {
        //   item['selected'] = false;
        //   _.remove(this.filter.states, val => val === _.toString(item.id));
        // }
        // console.log(item.state, 'status')
        // item['selected'] = true;
        this.status = this.status.map(value => {
          if (value.state === item.state) {
            value['selected'] = true;
            return value
          } else {
            value['selected'] = false;
            return value
          }
        });
        this.filter.status = item.state;
        // this.routerLink('categoryIds', 'states');
        this.routerLinke('status');
        break;
      case 'categories':
        let categorieIndex = _.indexOf(this.filter.categoryIds, _.toString(item.id));
        if (categorieIndex === -1) {
          item['selected'] = true;
          this.filter.categoryIds.push(_.toString(item.id))
        } else {
          item['selected'] = false;
          _.remove(this.filter.categoryIds, val => val === _.toString(item.id));
        }
        // this.routerLink('states', 'categoryIds');
        this.routerLinke('category');
        break;
    }
  }

  routerLinke(states) {
    switch (states) {
      case 'status':
        if (this.filter.status !== '') {
          this.router.navigate([`/activity-list`], {
            queryParams: {states: this.filter.status}
          });
        }
        if (this.filter.status === '' && this.filter.categoryIds.length > 0) {
          this.router.navigate([`/activity-list`], {
            queryParams: {categories: this.filter['categoryIds'].join(',')}
          })
        }
        if (this.filter.status !== '' && this.filter.categoryIds.length > 0) {
          this.router.navigate([`/activity-list`], {
            queryParams: {states: this.filter.status,categories: this.filter['categoryIds'].join(',')}
          })
        }
        if (this.filter.status === '' && this.filter.categoryIds.length === 0) {
              this.router.navigate([`/activity-list`]);
        }
        break;
      case 'category':
        if (this.filter.categoryIds.length > 0) {
          this.router.navigate([`/activity-list`], {
            queryParams: {categories: this.filter['categoryIds'].join(',')}
          });
        }
        if (this.filter.status !== '' && this.filter.categoryIds.length === 0) {
          this.router.navigate([`/activity-list`], {
            queryParams: {states: this.filter.status}
          })
        }
        if (this.filter.status !== '' && this.filter.categoryIds.length > 0) {
          this.router.navigate([`/activity-list`], {
            queryParams: {states: this.filter.status,categories: this.filter['categoryIds'].join(',')}
          })
        }
        if (this.filter.status === '' && this.filter.categoryIds.length === 0) {
          this.router.navigate([`/activity-list`]);
        }
        break;
    }
  }

  // routerLink(type: string, name: string) {
  //   if (this.filter[type].length > 0) {
  //     this.router.navigate([`/activity-list`],
  //       { queryParams: { states: this.filter.status, categories: this.filter['categoryIds'].join(',') } });
  //   } else {
  //     let names = name === 'states' ? 'states' : 'categories';
  //     let status = this.filter[name].length > 0 ? { queryParams: { names: this.filter[name].join(',') } } : {};
  //     this.router.navigate([`/activity-list`], status);
  //   }
  //   if (this.filter.states.length === 0 && this.filter.categoryIds.length === 0) {
  //     this.router.navigate([`/activity-list`]);
  //   }
  //   if (this.filter.states.length > 0 && this.filter.categoryIds.length === 0) {
  //     this.router.navigate([`/activity-list`], { queryParams: { states: this.filter.states.join(',') } });
  //   }
  //   if (this.filter.categoryIds.length > 0 && this.filter.states.length === 0) {
  //     this.router.navigate([`/activity-list`], { queryParams: { categories: this.filter.categoryIds.join(',') } });
  //   }
  // }

  //活动列表
  async getActivities(): Promise<any> {
    try {
      this.tableLoading = true;
      let data = await this.homeService.getActivities(
        this.filter.search === '' ? _.omit(this.filter, ['search', 'sorting']) : this.filter).toPromise();
      this.activities = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }

  //活动分类数据
  async getActivitiesCategories(): Promise<any> {
    try {
      let data = await this.homeService.getActivitiesCategories(this.filter).toPromise();
      this.activitiesCategories = data.result.filter(item => {
        return item;
      });
      this.searchSelect('categoryIds', this.activitiesCategories);
      this.metaCategories = data.meta;
    } catch (err) {
    }
  }

  //分页
  async pageChanged(event: any) {
    this.filter.page = event.page;
    this.filter.limit = event.itemsPerPage;
    window.scrollTo(0, 0);
    await this.getActivities();
  }
}
