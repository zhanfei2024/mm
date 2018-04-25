import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {ActivityAttachmentsDetailsComponent} from './activity-atachments-details/activity-attachments-details.component';
import {ActivityAttachmentsRoutingModule} from "./activity-attachments-routing.module";
import {ActivityAttachmentsComponent} from "./activity-attachments.component";
import {ActivityAttachmentsService} from "./activity-attachments.service";
import {ActivityAttachmentsListComponent} from "./activity-attachments-list/activity-attachments-list.component";


@NgModule({
  imports: [
    ActivityAttachmentsRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    ActivityAttachmentsComponent,
    ActivityAttachmentsListComponent,
    ActivityAttachmentsDetailsComponent,
  ],
  providers: [ActivityAttachmentsService]
})

export class ActivityAttachmentsModule {

}
