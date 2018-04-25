import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {CocShowService} from "../coc-show.service";
import {TabDetailComponent} from './tab-detail.component';
import {TabDetailRouting} from './tab-detail-routing';



@NgModule({
  imports: [
    TabDetailRouting,
    SharedModule,
  ],
  declarations: [
    TabDetailComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class TabDetailModule {

}
