import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {CocShowService} from "../coc-show.service";
import {RulesDetailComponent} from "./rules-detail.component";
import {RulesDetailRouting} from "./rules-detail-routing";


@NgModule({
  imports: [
    RulesDetailRouting,
    SharedModule,
  ],
  declarations: [
    RulesDetailComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class RulesDetailModule {

}
