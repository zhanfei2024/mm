import { NgModule } from '@angular/core';
import { CocHomeComponent } from "./coc-home.component";
import { SharedModule } from "../../../common/shared/shared.module";
import { CocHomeRoutingModule } from "./coc-home-routing";
import { CocShowService } from "../coc-show.service";
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from "ngx-swiper-wrapper";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
};
@NgModule({
  imports: [
    CocHomeRoutingModule,
    SwiperModule,
    SharedModule,
  ],
  declarations: [
    CocHomeComponent
  ],
  providers: [
    CocShowService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})

export class CocHomeModule {

}
