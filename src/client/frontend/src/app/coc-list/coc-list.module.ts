import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {HomeService} from "../home/home.service";
import {CocListRoutingModule} from "./coc-list-routing";
import {CocListComponent} from "./coc-list.component";


@NgModule({
  imports: [
    CocListRoutingModule,
    SharedModule,
  ],
  declarations: [
    CocListComponent,
  ],
  providers: [
    HomeService,
  ]
})

export class CocListModule {

}
