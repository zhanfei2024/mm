import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {AdminListComponent} from "./admin-list/admin-list.component";
import {AdminService} from "./admin.service";



@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    AdminComponent,
    AdminListComponent,
  ],
  providers: [AdminService]
})

export class AdminModule {

}


