import {NgModule} from '@angular/core';
import {UserCocRouting} from "./user-coc-routing";
import {SharedModule} from "../../../common/shared/shared.module";
import {UserService} from "../user.service";
import {UserCocComponent} from "./user-coc.component";
import {UserObservable} from "../user.observable";


@NgModule({
  imports: [
    UserCocRouting,
    SharedModule,
  ],
  declarations: [
    UserCocComponent,
  ],
  providers: [
    UserService,
    UserObservable
  ]
})

export class UserCocModule {

}
