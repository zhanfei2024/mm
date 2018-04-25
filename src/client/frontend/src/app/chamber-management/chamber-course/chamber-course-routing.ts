import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberCourseComponent} from "./chamber-course.component";
import {ChamberCourseListComponent} from "./list/chamber-course-list.component";
import {PostCourseComponent} from "./post/post-course.component";
import {PostCourseResolveService} from "./post-course.resolve-service";


const routes: Routes = [
  {
    path: '',
    component: ChamberCourseComponent,
    children: [
      {
        path: 'list',
        component: ChamberCourseListComponent
      },
      {
        path: 'create',
        component: PostCourseComponent
      },
      {
        path: ':courseId/edit',
        component: PostCourseComponent,
        resolve: {
          FindResolve: PostCourseResolveService
        }
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
  ]
})

export class ChamberCourseRouting {

}
