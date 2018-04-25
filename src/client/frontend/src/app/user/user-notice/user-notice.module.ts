import {UserService} from "../user.service";
import {SharedModule} from "../../../common/shared/shared.module";
import {NgModule} from "@angular/core";
import {UserNoticeRouting} from "./user-notice.routing";
import {UserNoticeComponent} from "./user-notice.component";



@NgModule({
  imports: [
    UserNoticeRouting,
    SharedModule,
  ],
  declarations: [
    UserNoticeComponent,
  ],
  providers: [
    UserService
  ]
})

export class UserNoticeModule {

}
