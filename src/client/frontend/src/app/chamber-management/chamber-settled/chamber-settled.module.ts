import {NgModule} from "@angular/core";
import {ChamberService} from "../chamber.service";
import {DialogService} from "../../../common/dialog/dialog.service";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import {SharedModule} from "../../../common/shared/shared.module";
import {CustomFileUploadModule} from "../../../common/edit-file-uploader/file-uploader.module";
import {QuillEditorModule} from 'ngx-quill-editor';
import {ChamberSettledComponent} from "./chamber-settled.component";
import {ChamberSettledPostComponent} from "./post/chamber-settled-post.component";
import {ChamberSettledSuccessComponent} from "./success/chamber-settled-success.component";
import {ChamberSettledService} from "./post/chamber-settled.service";
import {ChamberSettledResolveService} from "./post/chamber-settled.resolve-service";
import {ChamberSettledRouting} from "./chamber-settled-routing";
import {ChamberMemberGroupService} from "../chamber-member/list/chamber-member-group.service";



@NgModule({
  imports: [
    ChamberSettledRouting,
    SharedModule,
    CustomPaginationModule,
    CustomFileUploadModule,
    QuillEditorModule,
  ],
  declarations: [
    ChamberSettledComponent,
    ChamberSettledPostComponent,
    ChamberSettledSuccessComponent
  ],
  providers: [
    DialogService,
    ChamberSettledService,
    ChamberSettledResolveService,
    ChamberService,
    ChamberMemberGroupService,
  ]
})

export class ChamberSettledModule {

}
