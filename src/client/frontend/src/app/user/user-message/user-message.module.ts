import {UserService} from "../user.service";
import {SharedModule} from "../../../common/shared/shared.module";
import {NgModule} from "@angular/core";
import {UserMessageRouting} from "./user-message.routing";
import {UserMessageComponent} from "./user-message.component";



@NgModule({
  imports: [
    UserMessageRouting,
    SharedModule,
  ],
  declarations: [
    UserMessageComponent,
  ],
  providers: [
    UserService
  ]
})

export class UserMessageModule {

}
