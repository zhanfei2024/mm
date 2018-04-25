import {NgModule} from '@angular/core';
import {UserActivitiesRouting} from "./user-activities-routing";
import {SharedModule} from "../../../common/shared/shared.module";
import {UserActivitiesComponent} from "./user-activities.component";
import {UserService} from "../user.service";
import {UserObservable} from "../user.observable";


@NgModule({
  imports: [
    UserActivitiesRouting,
    SharedModule,
  ],
  declarations: [
    UserActivitiesComponent,
  ],
  providers: [
    UserService,
    UserObservable
  ]
})

export class UserActivitiesModule {

}
