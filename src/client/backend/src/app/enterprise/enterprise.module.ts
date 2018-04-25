import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {EnterpriseDetailsComponent} from './enterprise-details/enterprise-details.component';
import {EnterpriseRoutingModule} from "./enterprise-routing.module";
import {EnterpriseComponent} from "./enterprise.component";
import {EnterpriseService} from "./enterprise.service";
import {EnterpriseListComponent} from "./enterprise-list/enterprise-list.component";


@NgModule({
  imports: [
    EnterpriseRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    EnterpriseComponent,
    EnterpriseListComponent,
    EnterpriseDetailsComponent,
  ],
  providers: [EnterpriseService]
})

export class EnterpriseModule {

}
