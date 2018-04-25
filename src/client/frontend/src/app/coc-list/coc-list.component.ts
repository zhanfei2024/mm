import { Component, OnInit, DoCheck } from '@angular/core';
import { HomeService} from '../home/home.service';
import { IMeta, IFilter } from "../../common/http/http.service";
import * as _ from "lodash";
import { ChamberSettledService } from "../chamber-management/chamber-settled/post/chamber-settled.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SeoService } from "../../common/global/seo";
import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: './coc-list.component.html',
  providers: [ChamberSettledService]
})
export class CocListComponent implements OnInit, DoCheck {
  public filter: IFilter = {
    page: 1,
    limit: 12,
    sorting: 'createAtDESC',
    search: '',
    foundingDate: '',
    locationId: [],
    industryId: [],
  };
  public industries: any[] = [];
  public locations: any[] = [];
  public locationId: any[] = [];
  public industryId?: any[] = [];
  public scale: any[] = [];
  public cocs = [];
  public meta: IMeta = { pagination: {} };
  public scopeShow: boolean = true;
  public isMore: boolean;
  public isSearch: boolean;
  public tableLoading: boolean;
  public isIndustriesMore: boolean;
  public foundingShow: boolean = true;

  constructor(private homeService: HomeService,
    private chamberSettledService: ChamberSettledService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private router: Router,
    private translate: TranslateService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(`${this.translate.instant('navbar.coc_list')}_${this.translate.instant('global.coc_title')}`, this.seoService.getTitleContent());
    this.seoService.setKeyWords(`${this.translate.instant('navbar.coc_list')}`);
    this.seoService.setDescription(`${this.translate.instant('global.coc_coc_description')}`);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.isSearch = !_.isEmpty(queryParams) ? true : false;
      this.filter.search = !_.isUndefined(queryParams['search']) ? queryParams['search'] : '';
      this.filter.locationId = !_.isUndefined(queryParams['location']) ? queryParams['location'].split(',') : [];
      this.filter.industryId = !_.isUndefined(queryParams['industry']) ? queryParams['industry'].split(',') : [];
      this.getCocs();
    });
    this.getIndustries();
    this.getLocations();

  }

  searchSelect(name: string, item: any) {
    if (item.length > 0) {
      _.each(this.filter[name], (val) => {
        let i = _.findIndex(item, (value) => { return value.id === _.toNumber(val) });
        if (i !== -1) {
          item[i]['select'] = true;
        }
      });
    }
  }

  /*不选*/
  restSelected(type: string): void {
    switch (type) {
      case 'locations':
        this.filter.locationId = [];
        this.locations.forEach(value => {
          value['select'] = false;
        })
        break;
      case 'industry':
        this.filter.industryId = [];
        this.industries.forEach(value => {
          value['select'] = false;
        })
        break;
    }
    this.routerLink('locationId', 'industryId');
  }
  selected(item: any, type: string) {
    switch (type) {
      case 'locations':
        let locationIndex = _.indexOf(this.filter.locationId, _.toString(item.id));
        if (locationIndex === -1) {
          item['select'] = true;
          this.filter.locationId.push(_.toString(item.id));
        } else {
          item['select'] = false;
          _.remove(this.filter.locationId, val => val === _.toString(item.id));
        }
        this.routerLink('industryId', 'locationId');
        break;
      case 'industry':
        let i = _.indexOf(this.filter.industryId, _.toString(item.id));
        if (i === -1) {
          item['select'] = true;
          this.filter.industryId.push(_.toString(item.id));
        } else {
          item['select'] = false;
          _.remove(this.filter.industryId, val => val === _.toString(item.id));
        }
        this.routerLink('locationId', 'industryId');
        break;
    }

  }

  routerLink(type: string, name: string) {
    if (this.filter[type].length > 0) {
      this.router.navigate([`/coc-list`], { queryParams: { location: this.filter['locationId'].join(','), industry: this.filter['industryId'].join(',') } });
    } else {
      let names = name === 'locationId' ? 'location' : 'industry';
      let location = this.filter[name].length > 0 ? { queryParams: { names: this.filter[name].join(',') } } : {};
      this.router.navigate([`/coc-list`], location);
    }
    if (this.filter.industryId.length === 0 && this.filter.locationId.length === 0) {
      this.router.navigate([`/coc-list`]);
    }
    if (this.filter.industryId.length > 0 && this.filter.locationId.length === 0) {
      this.router.navigate([`/coc-list`], { queryParams: { industry: this.filter.industryId.join(',') } });
    }
    if (this.filter.industryId.length === 0 && this.filter.locationId.length > 0) {
      this.router.navigate([`/coc-list`], { queryParams: { location: this.filter.locationId.join(',') } });
    }
  }

  //商会列表
  async getCocs(): Promise<any> {
    try {
      this.tableLoading = true;
      let data = await this.homeService.getCocs(this.filter.search === '' ? _.omit(this.filter, ['search', 'foundingDate']) : this.filter).toPromise();
      this.cocs = data.result;
      this.meta = data.meta;
      this.tableLoading = false;
      if (this.cocs.length === 0 && this.filter.search !== '') {
        this.router.navigate(['/no_search']);
      }
    } catch (err) {
      this.tableLoading = false;
    }
  }

  //获取行业
  async getIndustries(): Promise<any> {
    try {
      let data = await this.chamberSettledService.getIndustries({}).toPromise();
      this.industries = data.result;
      this.searchSelect('industryId', this.industries);
    } catch (err) {
      console.error('An error occurred', err); // for demo purposes only
    }
  }


  //获取地区
  async getLocations(): Promise<any> {
    try {
      let result = await this.chamberSettledService.getLocations({}).toPromise();
      this.locations = result.result;
      this.searchSelect('locationId', this.locations);
    } catch (err) {
      console.error('An error occurred', err); // for demo purposes only
    }
  }

  more(type: string) {
    if (type === 'locations') {
      this.isMore = !this.isMore;
    } else {
      this.isIndustriesMore = !this.isIndustriesMore;
    }
  }

  //分页切换
  async pageChanged(event: any) {
    this.filter.page = event.page;
    this.filter.limit = event.itemsPerPage;
    window.scrollTo(0, 0);
    await this.getCocs();
  }

  /*排序*/
  stateToggle(state: string): void {
    switch (state) {
      case 'scopeShow':
        this.scopeShow = !this.scopeShow;
        if (this.foundingShow) {
          this.foundingShow = false;
        }
        if (this.scopeShow) {
          this.filter.sorting = 'scaleASC';
        } else {
          this.filter.sorting = 'scaleDESC';
        }
        this.getCocs();
        break;
      case 'foundingShow':
        this.foundingShow = !this.foundingShow;
        this.filter.sorting = 'scale';
        if (this.scopeShow) {
          this.scopeShow = false;
        }
        if (this.foundingShow) {
          this.filter.sorting = 'foundingDateASC';
        } else {
          this.filter.sorting = 'foundingDateDESC';
        }
        this.getCocs();
        break;
    }
  }

}
