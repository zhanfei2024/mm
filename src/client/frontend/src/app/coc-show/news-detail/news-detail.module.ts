import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {NewsDetailRouting} from "./news-detail-routing";
import {CocShowService} from "../coc-show.service";
import {NewsDetailComponent} from "./news-detail.component";


@NgModule({
  imports: [
    NewsDetailRouting,
    SharedModule,
  ],
  declarations: [
    NewsDetailComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class NewsDetailModule {

}
