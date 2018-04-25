import {Component, DoCheck, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {ToasterService} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";
import {IFilter, IMeta} from "../../../../common/http/http.service";
import {DialogService} from "../../../../common/dialog/dialog.service";
import {SeoService} from "../../../../common/global/seo";
import {Course, CourseService} from "../chamber-course.service";

@Component({
  templateUrl: './chamber-course-list.component.html',
})
export class ChamberCourseListComponent implements OnInit, DoCheck {
  public course: any = new Course();
  public row: any;
  public id: string;
  public fileName: string;
  public funcName: string;
  public url: string;
  public title: string;
  public order: number;
  public submitLoading: boolean;
  public tableLoading: boolean;
  public filter: IFilter = {
    page: 1,
    limit: 4,
    sorting: '',
    search: '',
  };
  public meta: IMeta = {pagination: {}};


  constructor(private courseService: CourseService,
              private toasterService: ToasterService,
              private dialogService: DialogService,
              private seoService: SeoService,
              private translate: TranslateService) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translate.instant('chamber.left.course'), this.seoService.getTitleContent());
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.getCourse();
  }

  onSearch(): void {
    this.filter.page = 1;
    this.getCourse();
  }


  async getCourse() {
    try {
      this.tableLoading = true;
      let data = await this.courseService.get(this.id, this.filter.search === '' ? _.omit(this.filter, 'search') : this.filter).toPromise();
      this.row = _.sortBy(  data.result , ['order']);
      this.meta = data.meta;
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }


  async changePage(event: any) {
    this.filter.page = event.page;
    await this.getCourse();
  }


  async delete(id: string): Promise<any> {
    try {
      const confirmed = await this.dialogService.confirm('confirm delete?');
      if (confirmed) {
        this.tableLoading = true;
        await this.courseService.delete(this.id, id).toPromise();
        this.toasterService.pop('success', '', this.translate.instant('message.delete_success'));
      }
      if (this.row.length === 1 && this.filter.page - 1 > 0) {
        this.filter.page -= 1;
      }
      this.getCourse();
    } catch (err) {

    }
  }

}
