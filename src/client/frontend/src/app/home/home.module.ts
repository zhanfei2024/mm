import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {HomeRoutingModule} from "./home-routing";
import {HomeService} from "./home.service";
import {HomeComponent} from "./home.component";


@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    HomeService,
  ]
})

export class HomeModule {

}
