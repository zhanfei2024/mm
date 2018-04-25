import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from "@angular/router";
import {HomeService} from "../../app/home/home.service";

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
})
export class HomeNavbarComponent implements OnInit {
  public currentLang: string;
  public search: string;
  public cocs: any;

  constructor(private translate: TranslateService,
              private homeService: HomeService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentLang = this.translate.instant('lang.language');
    this.getCocs();
  }

  async getCocs(): Promise<any> {
    try {
      let data = await this.homeService.getCocs({limit: 4, sorting: "viewDESC"}).toPromise();
      this.cocs = data.result;
    } catch (err) {
    }
  }


  onSearch(name: string) {
    this.router.navigate([`/coc-list`], {queryParams: {search: name}});
  }
}
