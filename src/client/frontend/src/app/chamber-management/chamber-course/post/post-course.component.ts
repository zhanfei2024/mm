import {Component, OnInit, ViewChild} from '@angular/core';
import * as _ from "lodash";
import {ToasterService} from "angular2-toaster";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Config} from "../../../../common/config/config";
import {Course, CourseService} from "../chamber-course.service";

@Component({
  templateUrl: './post-course.component.html',
})
export class PostCourseComponent implements OnInit {
  public title: string;
  public funcName: string;
  public fileName: string;
  public editCourseUrl: string;
  public submitLoading: boolean;
  public isCover: boolean;
  public id: string;
  public know: any;
  public courseUrl: string = '../../../assets/img/logo/default_company_icon.png';
  @ViewChild('course') courses;

  constructor(private courseService: CourseService,
              private toasterService: ToasterService,
              private config: Config,
              private translate: TranslateService,
              private router: Router,
              private activeRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.activeRouter.data.subscribe((data: { FindResolve: any }) => {
      if (!_.isUndefined(data.FindResolve)) {
        this.know = data.FindResolve.result;
        this.courseUrl = this.know.slideShowUrl;
        this.isCover = true;
        this.title = 'chamber.btn.edit_course';
      } else {
        this.know = new Course();
        this.title = 'chamber.btn.add_course';
      }
    });
  }

  editCountChange(event) {
    if (_.isUndefined(this.know.id)) {
      this.courseUrl = event.url;
    } else {
      this.editCourseUrl = event.url;
    }
  }


  async onSubmit() {
    try {
      this.submitLoading = true;
      this.funcName = _.isUndefined(this.know.id) ? 'store' : 'update';
      let message = this.funcName === 'store' ? 'message.store_message' : 'message.update_message';
      if (_.isUndefined(this.know.id) && this.courseUrl === '../../../assets/img/logo/default_company_icon.png') {
        this.toasterService.pop('error', 'error', this.translate.instant('message.file_cover_error'));
        this.submitLoading = false;
        return;
      } else {
        let data = await this.courseService[this.funcName](this.id, this.know).toPromise();
        if (_.isUndefined(this.know.id) && this.courseUrl !== '../../../assets/img/logo/default_company_icon.png') {
          this.courses.authToken = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
          this.courses.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/slide-show/${data.id}`;
          await this.courses.upload('POST');
        }
        if (!_.isUndefined(this.know.id) && !_.isUndefined(this.editCourseUrl)) {
          this.courses.authToken = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
          this.courses.url = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/slide-show/${data.id}`;
          await this.courses.upload('POST');
        }
        this.toasterService.pop('success', 'Success', this.translate.instant(message));
        this.submitLoading = false;
      }
      this.router.navigate(['/chamber', this.id, 'course', 'list']);
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }


}
