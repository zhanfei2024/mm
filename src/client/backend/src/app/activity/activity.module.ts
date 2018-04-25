import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {ActivityDetailsComponent} from './activity-details/activity-details.component';
import {ActivityRoutingModule} from "./activity-routing.module";
import {ActivityComponent} from "./activity.component";
import {ActivityService} from "./activity.service";
import {ActivityListComponent} from "./activity-list/activity-list.component";


@NgModule({
  imports: [
    ActivityRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    ActivityComponent,
    ActivityListComponent,
    ActivityDetailsComponent,
  ],
  providers: [ActivityService]
})

export class ActivityModule {

}
