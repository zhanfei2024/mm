import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {CocRulesRoutingModule} from "./coc-rules-routing";
import {CocShowService} from "../coc-show.service";
import {CocRulesComponent} from "./coc-rules.component";


@NgModule({
  imports: [
    CocRulesRoutingModule,
    SharedModule,
  ],
  declarations: [
    CocRulesComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class CocRulesModule {

}
