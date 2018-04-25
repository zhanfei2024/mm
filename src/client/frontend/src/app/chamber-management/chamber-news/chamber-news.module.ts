import {NgModule} from "@angular/core";
import {ChamberService} from "../chamber.service";
import {ChamberNewsRouting} from "./chamber-news-routing";
import {DialogService} from "../../../common/dialog/dialog.service";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import {SharedModule} from "../../../common/shared/shared.module";
import {ChamberNewsComponent} from "./chamber-news.component";
import {ChamberNewsListComponent} from "./list/chamber-news-list.component";
import {PostChamberNewsComponent} from "./post/post-chamber-news.component";
import {ChamberNewsService} from "./chamber-news.service";
import {CustomFileUploadModule} from "../../../common/edit-file-uploader/file-uploader.module";
import {QuillEditorModule} from 'ngx-quill-editor';
import {ChamberNewsResolveService} from "./chamber-news.resolve-service";



@NgModule({
  imports: [
    ChamberNewsRouting,
    SharedModule,
    CustomPaginationModule,
    CustomFileUploadModule,
    QuillEditorModule
  ],
  declarations: [
    ChamberNewsComponent,
    ChamberNewsListComponent,
    PostChamberNewsComponent
  ],
  providers: [
    ChamberNewsService,
    ChamberNewsResolveService,
    DialogService,
    ChamberService
  ]
})

export class ChamberNewsModule {

}
