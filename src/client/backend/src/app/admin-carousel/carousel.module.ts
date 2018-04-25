import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {CarouselComponent} from "./carousel.component";
import {CarouselRoutingModule} from "./carousel-routing.module";
import {CarouselService} from "./carousel.service";
import {CarouselListComponent} from "./carousel-list/carousel-list.component";
import {CarouselFormComponent} from "./carousel-form/carousel-form.component";
import {CustomFileUploadModule} from "../../common/edit-file-uploader/file-uploader.module";
import {CarouselResolveService} from "./carousel.resolve-service";


@NgModule({
  imports: [
    CarouselRoutingModule,
    SharedModule,
    CustomPaginationModule,
    CustomFileUploadModule
  ],
  declarations: [
    CarouselComponent,
    CarouselListComponent,
    CarouselFormComponent,
  ],
  providers: [
    CarouselService,
    CarouselResolveService]
})

export class CarouselModule {

}
