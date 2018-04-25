import {NgModule} from '@angular/core';
import {UserHomeRouting} from "./user-home-routing";
import {SharedModule} from "../../../common/shared/shared.module";
import {UserService} from "../user.service";
import {UserHomeComponent} from "./user-home.component";
import {UserObservable} from "../user.observable";


@NgModule({
  imports: [
    UserHomeRouting,
    SharedModule,
  ],
  declarations: [
    UserHomeComponent,
  ],
  providers: [
    UserService,
    UserObservable
  ]
})

export class UserHomeModule {

}
