import {Component, DoCheck, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as _ from "lodash";
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Config} from "../../../../common/config/config";
import {ChamberNewsService, News} from "../chamber-news.service";
import {ChamberService} from "../../chamber.service";

@Component({
  templateUrl: './post-chamber-news.component.html',
})
export class PostChamberNewsComponent implements OnInit, DoCheck {
  public title: string;
  public addTitle: string;
  public funcName: string;
  public routerUrl: string;
  public id: string;
  public post: any;
  public postUrl: any;
  public isCover: boolean;
  public submitLoading: boolean;
  public activeatePublic: any[] = [];
  public isSave: boolean;
  public public: any[] = [];
  public editCoverUrl: string;
  public submitShow: boolean = false;
  public coverUrl: string = '../../../assets/img/logo/default_company_icon.png';
  @ViewChild('cover') cover;

  @ViewChild('titleHanlder') public titleHanlder: ElementRef;
  @ViewChild('contentHanlder') public contentHanlder: ElementRef;
  @ViewChild('isPublicHanlder') public isPublicHanlder: ElementRef;


  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    if (this.titleHanlder['dirty'] || this.isPublicHanlder['dirty']
      || this.contentHanlder['dirty']) {
      $event['returnValue'] = 'Your data will be lost!';
    }
  }

  constructor(private chamberNewsService: ChamberNewsService,
              private toasterService: ToasterService,
              private chamberService: ChamberService,
              public  translate: TranslateService,
              private activeRouter: ActivatedRoute,
              private config: Config,
              private router: Router) {
  }

  ngDoCheck() {
    this.public = [
      {id: "true", text: this.translate.instant('global.true_public')},
      {id: "false", text: this.translate.instant('global.false_public')}
    ];
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.activeRouter.data.subscribe((data: { FindResolve: any }) => {
      if (!_.isUndefined(data.FindResolve)) {
        this.post = data.FindResolve.result;
        let name = this.post.isPublic ? this.translate.instant('global.true_public') : this.translate.instant('global.false_public');
        this.activeatePublic[0] = {id: _.toString(this.post.isPublic), text: name};
        this.addTitle = 'chamber.btn.edit_article';
      } else {
        this.post = new News();
        this.addTitle = 'chamber.btn.add_article';
      }
      if (!_.isUndefined(this.post.cover)) {
        this.coverUrl = this.post.cover.url;
        this.isCover = true;

      }
    });
    if (location.hash === `#/chamber/${this.id}/news/create` || location.hash === `#/chamber/${this.id}/news/${this.post['id']}/edit`) {
      if (_.isUndefined(this.post.id)) {
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/posts`;
        this.funcName = 'post';
      } else {
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/posts/${this.post.id}`;
        this.funcName = 'put';
      }
      this.routerUrl = 'news';
      this.title = 'chamber.left.news';
      this.post.isPublic = 'true';
    }
    if (location.hash === `#/chamber/${this.id}/notice/create` || location.hash === `#/chamber/${this.id}/notice/${this.post['id']}/edit`) {
      if (_.isUndefined(this.post.id)) {
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/announcements`;
        this.funcName = 'post';
      } else {
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/announcements/${this.post.id}`;
        this.funcName = 'put';
      }
      this.routerUrl = 'notice';
      this.title = 'chamber.left.notice';
      this.addTitle = 'chamber.btn.add_notice';
      this.post['publishAt'] = new Date();
    }
  }

  selected(data: any) {
    this.post.isPublic = data.id;
  }

  editCountChange(event) {
    this.coverUrl = event.url;
  }

  async onSubmit() {
    try {
      this.submitLoading = true;
      this.isSave = true;
      let message = this.funcName === 'store' ? 'message.store_message' : 'message.update_message';
      if (this.routerUrl === 'news' && _.isUndefined(this.post.id) && this.coverUrl === '../../../assets/img/logo/default_company_icon.png') {
        this.toasterService.pop('error', 'error', this.translate.instant('message.file_cover_error'));
        this.submitLoading = false;
        return;
      } else {
        let data = await this.chamberService.makeFileRequest(this.postUrl, this.post, this.funcName);
        if (this.routerUrl === 'news') {
          if (_.isUndefined(this.post.id) && this.coverUrl !== '../../../assets/img/logo/default_company_icon.png') {
            this.cover.authToken = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
            this.cover.url = `${this.config.apiEndPoint}enterprise/enterprises/posts/${data.result.id}/upload-cover`;
            await this.cover.upload('POST');
          }
          if (!_.isUndefined(this.post.id) && !_.isUndefined(this.editCoverUrl)) {
            this.cover.authToken = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
            this.cover.url = `${this.config.apiEndPoint}enterprise/enterprises/posts/${data.result.id}/upload-cover`;
            await this.cover.upload('POST');
          }
        }
      }
      this.toasterService.pop('success', 'Success', this.translate.instant(message));
      this.submitLoading = false;
      this.router.navigate(['/chamber', localStorage.getItem('chamber'), this.routerUrl, 'list']);
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }
}
