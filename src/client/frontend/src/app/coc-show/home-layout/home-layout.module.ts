import { NgModule } from '@angular/core';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from "ngx-swiper-wrapper";
import {SharedModule} from "../../../common/shared/shared.module";
import { HomeLayoutComponent} from './home-layout.component';
import {UserService} from "../../user/user.service";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  paginationClickable: true,
};

@NgModule({
  imports: [
    SharedModule,
    SwiperModule
  ],
  declarations: [
    HomeLayoutComponent
  ],
  providers: [
    UserService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    }
  ]
})

export class HomeLayoutModule {

}
