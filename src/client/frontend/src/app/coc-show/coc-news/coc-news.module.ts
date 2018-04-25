import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {CocNewsRoutingModule} from "./coc-news-routing";
import {CocShowService} from "../coc-show.service";
import {CocNewsComponent} from "./coc-news.component";


@NgModule({
  imports: [
    CocNewsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CocNewsComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class CocNewsModule {

}
