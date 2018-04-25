import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {PostCategoryDetailsComponent} from './post-category-details/post-category-details.component';
import {PostCategoryRoutingModule} from "./post-category-routing.module";
import {PostCategoryComponent} from "./post-category.component";
import {PostCategoryService} from "./post-category.service";
import {PostCategoryListComponent} from "./post-category-list/post-category-list.component";


@NgModule({
  imports: [
    PostCategoryRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    PostCategoryComponent,
    PostCategoryListComponent,
    PostCategoryDetailsComponent,
  ],
  providers: [PostCategoryService]
})

export class PostCategoryModule {

}
