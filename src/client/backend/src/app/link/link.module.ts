import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {LinkDetailsComponent} from './link-details/link-details.component';
import {LinkRoutingModule} from "./link-routing.module";
import {LinkComponent} from "./link.component";
import {LinkService} from "./link.service";
import {LinkListComponent} from "./link-list/link-list.component";


@NgModule({
  imports: [
    LinkRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    LinkComponent,
    LinkListComponent,
    LinkDetailsComponent,
  ],
  providers: [LinkService]
})

export class LinkModule {

}
