import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {ActivityCandidateRoutingModule} from './activity-candidate-routing.module';
import {ActivityCandidateComponent} from './activity-candidate.component';
import {ActivityCandidateListComponent} from './activity-candidate-list/activity-candidate-list.component';
import {ActivityCandidateService} from './activity-candidate.service';



@NgModule({
  imports: [
    ActivityCandidateRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    ActivityCandidateComponent,
    ActivityCandidateListComponent,
  ],
  providers: [ActivityCandidateService]
})

export class ActivityCandidatelModule {

}
