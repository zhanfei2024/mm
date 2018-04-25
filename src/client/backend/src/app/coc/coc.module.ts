import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {CocDetailsComponent} from './coc-details/coc-details.component';
import {CocRoutingModule} from "./coc-routing.module";
import {CocComponent} from "./coc.component";
import {CocService} from "./coc.service";
import {CocListComponent} from "./coc-list/coc-list.component";


@NgModule({
  imports: [
    CocRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    CocComponent,
    CocListComponent,
    CocDetailsComponent,
  ],
  providers: [CocService]
})

export class CocModule {

}
