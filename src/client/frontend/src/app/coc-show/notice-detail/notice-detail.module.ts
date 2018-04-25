import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {NoticeDetailRouting} from "./notice-detail-routing";
import {CocShowService} from "../coc-show.service";
import {NoticeDetailComponent} from "./notice-detail.component";


@NgModule({
  imports: [
    NoticeDetailRouting,
    SharedModule,
  ],
  declarations: [
    NoticeDetailComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class NoticeDetailModule {

}
