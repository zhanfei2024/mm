import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {ActivityListComponent} from "./activity-list.component";
import {HomeService} from "../home/home.service";
import {ActivityListRoutingModule} from "./activity-list-routing";


@NgModule({
  imports: [
    ActivityListRoutingModule,
    SharedModule,
  ],
  declarations: [
    ActivityListComponent,
  ],
  providers: [
    HomeService,
  ]
})

export class ActivityListModule {

}
