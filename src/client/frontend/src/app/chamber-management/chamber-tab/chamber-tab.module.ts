import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../common/shared/shared.module";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import { ChamberTabComponent } from './chamber-tab/chamber-tab.component';
import { ListComponent } from './list/list.component';
import { PostComponent } from './post/post.component';
import {ChamberTabRouting} from './chamber-tab-routing';
import {ChamberTabService} from './chamber-tab.service';
import {QuillEditorModule} from 'ngx-quill-editor';


@NgModule({
  imports: [
    CommonModule,
    QuillEditorModule,
    SharedModule,
    CustomPaginationModule,
    ChamberTabRouting,
  ],
  declarations: [ChamberTabComponent, ListComponent, PostComponent],
  providers: [
    ChamberTabService
  ]
})
export class ChamberTabModule { }
