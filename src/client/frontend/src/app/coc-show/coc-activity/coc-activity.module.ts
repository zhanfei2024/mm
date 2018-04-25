import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {CocActivityRoutingModule} from "./coc-activity-routing";
import {CocShowService} from "../coc-show.service";
import {CocActivityComponent} from "./coc-activity.component";


@NgModule({
  imports: [
    CocActivityRoutingModule,
    SharedModule,
  ],
  declarations: [
    CocActivityComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class CocActivityModule {

}
