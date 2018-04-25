import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {UsersRoutingModule} from "./users-routing.module";
import {UsersComponent} from "./users.component";
import {UsersService} from "./users.service";
import {UsersListComponent} from "./user-list/users-list.component";
import {InvtationListComponent} from "./invitation/invtation-list.component";
import {UserDetailsComponent} from "./user-details/user-details.component";


@NgModule({
  imports: [
    UsersRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    UsersComponent,
    UsersListComponent,
    InvtationListComponent,
    UserDetailsComponent,
  ],
  providers: [UsersService]
})

export class UsersModule {

}
