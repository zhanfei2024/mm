import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {BankRoutingModule} from "./bank-routing.module";
import {BankComponent} from "./bank.component";
import {BankListComponent} from "./coc-list/bank-list.component";
import {BankService} from "./bank.service";



@NgModule({
  imports: [
    BankRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    BankComponent,
    BankListComponent,
  ],
  providers: [BankService]
})

export class BankModule {

}
