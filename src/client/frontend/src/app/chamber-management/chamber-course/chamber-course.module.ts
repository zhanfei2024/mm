import {NgModule} from "@angular/core";
import {SharedModule} from "../../../common/shared/shared.module";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import {DialogService} from "../../../common/dialog/dialog.service";
import {PostCourseResolveService} from "./post-course.resolve-service";
import {CourseService} from "./chamber-course.service";
import {ChamberCourseComponent} from "./chamber-course.component";
import {ChamberCourseListComponent} from "./list/chamber-course-list.component";
import {PostCourseComponent} from "./post/post-course.component";
import {ChamberCourseRouting} from "./chamber-course-routing";
import {CustomFileUploadModule} from "../../../common/edit-file-uploader/file-uploader.module";
import {ChamberService} from "../chamber.service";
import {QuillEditorModule} from 'ngx-quill-editor';



@NgModule({
  imports: [
    ChamberCourseRouting,
    SharedModule,
    CustomPaginationModule,
    CustomFileUploadModule,
    QuillEditorModule
  ],
  declarations: [
    ChamberCourseComponent,
    ChamberCourseListComponent,
    PostCourseComponent
  ],
  providers: [
    PostCourseResolveService,
    ChamberService,
    DialogService,
    CourseService
  ]
})

export class ChamberCourseModule {

}
