import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {HomeService} from "../home/home.service";
import {NewsListRoutingModule} from "./news-list-routing";
import {NewsListComponent} from "./news-list.component";


@NgModule({
  imports: [
    NewsListRoutingModule,
    SharedModule,
  ],
  declarations: [
    NewsListComponent,
  ],
  providers: [
    HomeService,
  ]
})

export class NewsListModule {

}
