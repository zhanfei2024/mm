import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {ActivityDetailRouting} from "./activity-detail-routing";
import {CocShowService} from "../coc-show.service";
import {ActivityDetailComponent} from "./activity-detail.component";


@NgModule({
  imports: [
    ActivityDetailRouting,
    SharedModule,
  ],
  declarations: [
    ActivityDetailComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class ActivityDetailModule {

}
