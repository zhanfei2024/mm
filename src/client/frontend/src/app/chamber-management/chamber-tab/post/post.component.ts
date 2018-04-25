import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChamberTabService, Tab} from '../chamber-tab.service';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit, OnDestroy {
  public tab: Tab = new Tab();
  public submitLoading: boolean = false;
  public id: string;
  public submitShow: boolean = false;
  public tabId: string;
  constructor(private chamberTabService: ChamberTabService,
              private toasterService: ToasterService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router) { }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.route.params.subscribe(param => {
      this.tabId = param['id'];
    });
    if (this.tabId) {
      this.getTab(this.id, this.tabId);
    }
  }
  ngOnDestroy() {
    localStorage.removeItem('tabId');
  }

  submit(data: Tab): void {
    if (this.tabId) {
      this.editTabs(this.id, data);
    } else {
      this.postTabs(this.id, data);
    }
  }


  async postTabs(chamberId: string, data: Tab): Promise<any> {
    try {
      this.submitLoading = true;
      let response = await this.chamberTabService.store(chamberId, data).toPromise();
      this.submitLoading = false;
      this.toasterService.pop('success', 'Success', this.translate.instant('message.store_message'));
      this.router.navigate(['/chamber', this.id, 'tab', 'list'])
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  async editTabs(chamberId: string, data: Tab): Promise<any> {
    try {
      this.submitLoading = true;
      let response = await this.chamberTabService.update(chamberId, data).toPromise();
      this.submitLoading = false;
      this.toasterService.pop('success', 'Success', this.translate.instant('message.update_message'));
      this.router.navigate(['/chamber', this.id, 'tab', 'list'])
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  async getTab(chamberId: string, tabId: string): Promise<any> {
    try {
      let data = await this.chamberTabService.getFind(chamberId, tabId).toPromise();
      this.tab = data.result;
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

}
