import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {SlideRoutingModule} from "./slide-routing.module";
import {SlideComponent} from "./slide.component";
import {SlideListComponent} from "./slide-list/slide-list.component";
import {SlideService} from "./slide.service";



@NgModule({
  imports: [
    SlideRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    SlideComponent,
    SlideListComponent,
  ],
  providers: [SlideService]
})

export class SlideModule {

}
