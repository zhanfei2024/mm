import {NgModule} from "@angular/core";
import {SharedModule} from "../../../common/shared/shared.module";
import {DialogService} from "../../../common/dialog/dialog.service";
import {ChamberPositionRoutingModule} from "./chamber-position-routing.module";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import {ChamberPositionService} from "./chamber-position.service";
import {AddKnowResolveService} from "./chamber-position.resolve-service";
import {ChamberPositionComponent} from './chamber-position.component';
import {ChamberPositionListComponent} from './list/chamber-position-list.component';
import {ChamberPositionPostComponent} from './post/chamber-position-post.component';
import {QuillEditorModule} from 'ngx-quill-editor';
import {ChamberService} from "../chamber.service";



@NgModule({
  imports: [
    ChamberPositionRoutingModule,
    SharedModule,
    QuillEditorModule,
    CustomPaginationModule,
  ],
  declarations: [
    ChamberPositionPostComponent,
    ChamberPositionListComponent,
    ChamberPositionComponent

  ],
  providers: [
    ChamberPositionService,
    AddKnowResolveService,
    DialogService,
    ChamberService
  ]
})

export class ChamberPositionModule {

}
