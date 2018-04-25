import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberNewsComponent} from "./chamber-news.component";
import {ChamberNewsListComponent} from "./list/chamber-news-list.component";
import {PostChamberNewsComponent} from "./post/post-chamber-news.component";
import {ChamberNewsResolveService} from "./chamber-news.resolve-service";
import {NewsCanDeactivateGuard} from "./user-deactivate";


const routes: Routes = [
  {
    path: '',
    component: ChamberNewsComponent,
    children: [
      {
        path: 'list',
        component: ChamberNewsListComponent
      },
      {
        path: 'create',
        component: PostChamberNewsComponent,
        canDeactivate: [NewsCanDeactivateGuard]
      },
      {
        path: ':id/edit',
        component: PostChamberNewsComponent,
        resolve: {
          FindResolve: ChamberNewsResolveService
        },
        canDeactivate: [NewsCanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    NewsCanDeactivateGuard
  ]
})

export class ChamberNewsRouting {

}
