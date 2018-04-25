import {NgModule} from "@angular/core";
import {ChamberMessageService} from "./chamber-message-service";
import {ChamberMessageComponent} from "./chamber-message.component";
import {ChamberMessageRouting} from "./chamber-message-routing";
import {SharedModule} from "../../../common/shared/shared.module";
import {DialogService} from "../../../common/dialog/dialog.service";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import {ChamberService} from "../chamber.service";



@NgModule({
  imports: [
    ChamberMessageRouting,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    ChamberMessageComponent
  ],
  providers: [
    ChamberMessageService,
    ChamberService,
    DialogService,
  ]
})

export class ChamberMessageModule {

}
