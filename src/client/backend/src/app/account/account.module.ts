import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {AccountRoutingModule} from "./account-routing.module";
import {AccountComponent} from "./account.component";
import {AccountListComponent} from "./account-list/account-list.component";
import {AccountService} from "./account.service";



@NgModule({
  imports: [
    AccountRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    AccountComponent,
    AccountListComponent,
  ],
  providers: [AccountService]
})

export class AccountModule {

}
