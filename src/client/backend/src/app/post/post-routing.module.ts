import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostDetailsComponent} from './post-details/post-details.component';
import {PostComponent} from "./post.component";
import {PostListComponent} from "./post-list/post-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
      {path: '', redirectTo: '/post/list', pathMatch: 'full'},
      {path: 'list', component: PostListComponent},
      {path: ':id/details', component: PostDetailsComponent}
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
export class PostRoutingModule {
}
