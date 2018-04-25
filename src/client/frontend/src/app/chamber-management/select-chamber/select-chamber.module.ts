import {NgModule} from "@angular/core";
import {SelectChamberRouting} from "./select-chamber-routing";
import {SelectChamberComponent} from "./select-chamber.component";
import {SharedModule} from "../../../common/shared/shared.module";
import {ChamberService} from "../chamber.service";
import {DialogService} from "../../../common/dialog/dialog.service";



@NgModule({
  imports: [
    SelectChamberRouting,
    SharedModule
  ],
  declarations: [
    SelectChamberComponent
  ],
  providers: [
    ChamberService,
    DialogService
  ]
})

export class SelectChamberModule {

}
