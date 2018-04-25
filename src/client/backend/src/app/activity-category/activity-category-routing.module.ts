import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityCategoryDetailsComponent} from './activity-category-details/activity-category-details.component';
import {ActivityCategoryComponent} from "./activity-category.component";
import {ActivityCategoryListComponent} from "./activity-category-list/activity-category-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: ActivityCategoryComponent,
    children: [
      {path: '', redirectTo: '/activity-category/list', pathMatch: 'full'},
      {path: 'list', component: ActivityCategoryListComponent},
      {path: ':id/details', component: ActivityCategoryDetailsComponent}
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(orderRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ActivityCategoryRoutingModule {
}
