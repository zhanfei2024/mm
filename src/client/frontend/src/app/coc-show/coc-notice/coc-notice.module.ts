import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {CocNoticeRoutingModule} from "./coc-notice-routing";
import {CocShowService} from "../coc-show.service";
import {CocNoticeComponent} from "./coc-notice.component";


@NgModule({
  imports: [
    CocNoticeRoutingModule,
    SharedModule,
  ],
  declarations: [
    CocNoticeComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class CocNoticeModule {

}
