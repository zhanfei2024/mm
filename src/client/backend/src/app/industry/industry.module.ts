import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {IndustryDetailsComponent} from './industry-details/industry-details.component';
import {IndustryRoutingModule} from "./industry-routing.module";
import {IndustryComponent} from "./industry.component";
import {IndustryService} from "./industry.service";
import {IndustryListComponent} from "./industry-list/industry-list.component";


@NgModule({
  imports: [
    IndustryRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    IndustryComponent,
    IndustryListComponent,
    IndustryDetailsComponent,
  ],
  providers: [IndustryService]
})

export class IndustryModule {

}
