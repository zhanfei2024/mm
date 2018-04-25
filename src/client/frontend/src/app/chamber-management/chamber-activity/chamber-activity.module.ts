import {NgModule} from "@angular/core";
import {SharedModule} from "../../../common/shared/shared.module";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import {DialogService} from "../../../common/dialog/dialog.service";
import {ChamberActivityRouting} from "./chamber-activity-routing";
import {CustomFileUploadModule} from "../../../common/edit-file-uploader/file-uploader.module";
import {ChamberActivityComponent} from "./chamber-activity.component";
import {ChamberActivityListComponent} from "./list/chamber-activity-list.component";
import {ActivityResolveService} from "./activity.resolve-service";
import {ChamberActivityService} from "./chamber-activity.service";
import {ChamberActivityExamineComponent} from "./examine/chamber-activity-examine.component";
import {ChamberActivityPostComponent} from "./post/chamber-activity-post.component";
import {QuillEditorModule} from 'ngx-quill-editor';
import {ChamberService} from "../chamber.service";



@NgModule({
  imports: [
    ChamberActivityRouting,
    SharedModule,
    CustomPaginationModule,
    CustomFileUploadModule,
    QuillEditorModule
  ],
  declarations: [
    ChamberActivityComponent,
    ChamberActivityListComponent,
    ChamberActivityPostComponent,
    ChamberActivityExamineComponent
  ],
  providers: [
    ActivityResolveService,
    DialogService,
    ChamberService,
    ChamberActivityService
  ]
})

export class ChamberActivityModule {

}
