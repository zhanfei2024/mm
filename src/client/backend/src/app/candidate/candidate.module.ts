import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {CandidateDetailsComponent} from './candidate-details/candidate-details.component';
import {CandidateRoutingModule} from "./candidate-routing.module";
import {CandidateComponent} from "./candidate.component";
import {CandidateService} from "./candidate.service";
import {CandidateListComponent} from "./candidate-list/candidate-list.component";


@NgModule({
  imports: [
    CandidateRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    CandidateComponent,
    CandidateListComponent,
    CandidateDetailsComponent,
  ],
  providers: [CandidateService]
})

export class CandidateModule {

}
