import {NgModule} from "@angular/core";
import {SharedModule} from "../../../common/shared/shared.module";
import {ChamberService} from "../chamber.service";
import {DialogService} from "../../../common/dialog/dialog.service";
import {ChamberMemberRouting} from "./chamber-member-routing";
import {ChamberMemberComponent} from "./chamber-member.component";
import {ChamberMemberListComponent} from "./list/chamber-member-list.component";
import {ChamberMemberExamineComponent} from "./member-examine/chamber-member-examine.component";
import {ChamberMemberExamineShowComponent} from "./examine/chamber-member-examine-show.component";
import {ChamberMemberService} from "./list/chamber-member.service";
import {ChamberMemberGroupService} from "./list/chamber-member-group.service";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import {ChamberPositionService} from "../chamber-position/chamber-position.service";
import {CocShowService} from "../../coc-show/coc-show.service";



@NgModule({
  imports: [
    ChamberMemberRouting,
    SharedModule,
    CustomPaginationModule,
  ],
  declarations: [
    ChamberMemberComponent,
    ChamberMemberListComponent,
    ChamberMemberExamineComponent,
    ChamberMemberExamineShowComponent,
  ],
  providers: [
    ChamberService,
    ChamberMemberService,
    ChamberMemberGroupService,
    DialogService,
    ChamberPositionService,
    CocShowService,
  ]
})

export class ChamberMemberModule {

}
