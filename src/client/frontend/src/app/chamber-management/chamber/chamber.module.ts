import {NgModule} from "@angular/core";
import {SharedModule} from "../../../common/shared/shared.module";
import {DialogService} from "../../../common/dialog/dialog.service";
import {ChamberKnowRoutingModule} from "./chamber-know-routing.module";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import {AddKnowService} from "./chamber-know.service";
import {AddKnowResolveService} from "./chamber-know.resolve-service";
import {ChamberKnowComponent} from "./chamber-know.component";
import {ChamberKnowListComponent} from "./list/chamber-know-list.component";
import {ChamberKnowPostComponent} from "./post/chamber-know-post.component";
import {QuillEditorModule} from 'ngx-quill-editor';
import {ChamberService} from "../chamber.service";



@NgModule({
  imports: [
    ChamberKnowRoutingModule,
    SharedModule,
    QuillEditorModule,
    CustomPaginationModule,
  ],
  declarations: [
    ChamberKnowComponent,
    ChamberKnowListComponent,
    ChamberKnowPostComponent
  ],
  providers: [
    AddKnowService,
    AddKnowResolveService,
    DialogService,
    ChamberService
  ]
})

export class ChamberModule {

}
