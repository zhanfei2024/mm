import {Component, OnInit, ViewChild} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {CarouselService, Courses} from "../carousel.service";
import {TranslateService} from "@ngx-translate/core";
import {Config} from "../../../common/config/config";
import * as _ from 'lodash';

@Component({
  templateUrl: './carousel-form.component.html',
  styleUrls: ['./carousel-form.component.scss']
})
export class CarouselFormComponent implements OnInit {
  public rows: any;
  @ViewChild('course') courses;
  public submitLoading: boolean;
  public courseUrl: string;
  public funcName: string;
  public editCourseUrl: string;


  details: any;
  modalDetailsLoading = false;

  public fileName: string;

  constructor(private carouselService: CarouselService,
              private toasterService: ToasterService,
              private translate: TranslateService,
              private config: Config,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { FindResolve: any }) => {
      if (!_.isUndefined(data.FindResolve)) {
        this.rows = data.FindResolve;
        this.courseUrl = this.rows.slideShowUrl;
      } else {
        this.rows = new Courses();
      }
    });
  }


  editCountChange(event) {
    if (_.isUndefined(this.rows.id)) {
      this.courseUrl = event.url;

    } else {
      this.editCourseUrl = event.url;

    }
  }

  async onSubmit() {
    try {
      this.submitLoading = true;
      let massage;
      if (_.isUndefined(this.rows.id)) {
        this.funcName = 'store';
        massage = 'panel.message.store_message';
      } else {
        this.funcName = 'update';
        massage = 'panel.message.update_message';
      }

      if(!this.IsURL(this.rows.url)) this.rows.url = 'http://' + this.rows.url;

      let result = await this.carouselService[this.funcName](this.rows).toPromise();
      if (_.isUndefined(this.rows.id)) {
        this.courses.authToken = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;
        this.courses.url = `${this.config.apiEndPoint}admin/slide-show/${result.id}`;
        await this.courses.upload('POST');
      }
      
      this.toasterService.pop('success', 'Success', this.translate.instant(massage));
      this.submitLoading = false;
      this.router.navigate(['/carousel', 'list']);

    } catch (err) {
      this.toasterService.pop('error', 'error', err.message);
      this.submitLoading = false;
    }
  }



   IsURL(str_url) {

    let strRegex = '^((https|http|ftp|rtsp|mms)?://)'
    let re = new RegExp(strRegex);
    //re.test()
    if (re.test(str_url)) {
      return (true);
    } else {
      return (false);
    }
  }

}
