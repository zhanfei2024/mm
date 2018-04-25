import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostCategoryDetailsComponent} from './post-category-details/post-category-details.component';
import {PostCategoryComponent} from "./post-category.component";
import {PostCategoryListComponent} from "./post-category-list/post-category-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: PostCategoryComponent,
    children: [
      {path: '', redirectTo: '/post-categories/list', pathMatch: 'full'},
      {path: 'list', component: PostCategoryListComponent},
      {path: ':id/details', component: PostCategoryDetailsComponent}
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
export class PostCategoryRoutingModule {
}
