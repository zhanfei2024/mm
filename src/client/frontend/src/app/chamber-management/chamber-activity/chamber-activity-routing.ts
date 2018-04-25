import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberActivityComponent} from "./chamber-activity.component";
import {ChamberActivityListComponent} from "./list/chamber-activity-list.component";
import {ActivityResolveService} from "./activity.resolve-service";
import {ActivityCanDeactivateGuard} from "./user-deactivate";
import {ChamberActivityExamineComponent} from "./examine/chamber-activity-examine.component";
import {ChamberActivityPostComponent} from "./post/chamber-activity-post.component";


const routes: Routes = [
  {
    path: '',
    component: ChamberActivityComponent,
    children: [
      {
        path: 'list',
        component: ChamberActivityListComponent
      },
      {
        path: 'examine',
        component: ChamberActivityExamineComponent
      },
      {
        path: 'create',
        component: ChamberActivityPostComponent,
        canDeactivate: [ActivityCanDeactivateGuard]
      },
      {
        path: ':ruleId/edit',
        component: ChamberActivityPostComponent,
        resolve: {
          FindResolve: ActivityResolveService
        },
        canDeactivate: [ActivityCanDeactivateGuard]
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
    ActivityCanDeactivateGuard
  ]
})

export class ChamberActivityRouting {

}
