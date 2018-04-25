import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {AnnounceDetailsComponent} from './announce-details/announce-details.component';
import {AnnounceRoutingModule} from "./announce-routing.module";
import {AnnounceComponent} from "./announce.component";
import {AnnounceService} from "./announce.service";
import {AnnounceListComponent} from "./announce-list/announce-list.component";


@NgModule({
  imports: [
    AnnounceRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    AnnounceComponent,
    AnnounceListComponent,
    AnnounceDetailsComponent,
  ],
  providers: [AnnounceService]
})

export class AnnounceModule {

}
