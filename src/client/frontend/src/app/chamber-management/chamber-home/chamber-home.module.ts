import {NgModule} from "@angular/core";
import {SharedModule} from "../../../common/shared/shared.module";
import {ChamberService} from "../chamber.service";
import {ChamberHomeComponent} from "./chamber-home.component";
import {ChamberHomeRouting} from "./chamber-home-routing";
import {ChamberLeftComponent} from "../chamber-left/chamber-left.component";



@NgModule({
  imports: [
    ChamberHomeRouting,
    SharedModule
  ],
  declarations: [
    ChamberHomeComponent,
  ],
  providers: [
    ChamberService,
  ]
})

export class ChamberHomeModule {

}
