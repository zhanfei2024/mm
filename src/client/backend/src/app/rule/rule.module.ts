import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {RuleRoutingModule} from "./rule-routing.module";
import {RuleComponent} from "./rule.component";
import {RuleListComponent} from "./rule-list/rule-list.component";
import {RuleService} from "./rule.service";



@NgModule({
  imports: [
    RuleRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    RuleComponent,
    RuleListComponent,
  ],
  providers: [RuleService]
})

export class RuleModule {

}
