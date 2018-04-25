import {NgModule, Directive} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SelectModule} from 'ng2-select';
import {RouterModule} from '@angular/router';
import {
  ModalModule,
  CarouselModule,
  PaginationModule
} from 'ngx-bootstrap';

import {FormMessageModule} from '../control-message/index';
import {PipeModule} from '../pipe/index';
import {CustomFormsModule} from "ng2-validation";
import {ChamberLeftComponent} from "../../app/chamber-management/chamber-left/chamber-left.component";
import {HomeNavbarComponent} from "../home-navbar/home-navbar.component";
import {NoticeAnnouncementComponent} from "../../app/coc-show/notice-announcement/notice-announcement.component";
import {CustomFileUploadModule} from "../edit-file-uploader/file-uploader.module";
import {ImageCropperModule} from "ng2-img-cropper";
import {HtmlPipe} from '../pipe/html.pipe';

export const SHARED_MODULE_DIRECTIVES: Directive[] = [
  // core
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  RouterModule,
  CustomFileUploadModule,
  // UI plugin
  ModalModule,
  SelectModule,
  ImageCropperModule,
  // BsDropdownModule,
  PaginationModule,
  CarouselModule,
  // other
  CustomFormsModule,
  FormMessageModule,
  PipeModule
];

@NgModule({
  imports: [SHARED_MODULE_DIRECTIVES],
  declarations: [
    ChamberLeftComponent,
    HomeNavbarComponent,
    NoticeAnnouncementComponent,
    HtmlPipe,
  ],
  exports: [SHARED_MODULE_DIRECTIVES,
    ChamberLeftComponent,
    HomeNavbarComponent,
    NoticeAnnouncementComponent,
    HtmlPipe,
  ]
})
export class SharedModule {
}
