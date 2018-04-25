import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {ActivityCategoryDetailsComponent} from './activity-category-details/activity-category-details.component';
import {ActivityCategoryRoutingModule} from "./activity-category-routing.module";
import {ActivityCategoryComponent} from "./activity-category.component";
import {ActivityCategoryService} from "./activity-category.service";
import {ActivityCategoryListComponent} from "./activity-category-list/activity-category-list.component";


@NgModule({
  imports: [
    ActivityCategoryRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    ActivityCategoryComponent,
    ActivityCategoryListComponent,
    ActivityCategoryDetailsComponent,
  ],
  providers: [ActivityCategoryService]
})

export class ActivityCategoryModule {

}
