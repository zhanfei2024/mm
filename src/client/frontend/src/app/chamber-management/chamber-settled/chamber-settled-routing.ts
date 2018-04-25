import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberSettledComponent} from "./chamber-settled.component";
import {CanDeactivateGuard} from "./post/user-deactivate";
import {ChamberSettledResolveService} from "./post/chamber-settled.resolve-service";
import {ChamberSettledPostComponent} from "./post/chamber-settled-post.component";
import {ChamberSettledSuccessComponent} from "./success/chamber-settled-success.component";



const routes: Routes = [
  {
    path: '',
    component: ChamberSettledComponent,
    children: [
      {
        path: 'settled',
        component: ChamberSettledPostComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'create',
        component: ChamberSettledPostComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id/edit',
        component: ChamberSettledPostComponent,
        resolve: {
          FindResolve: ChamberSettledResolveService
        },
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'success',
        component: ChamberSettledSuccessComponent
      },
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
    CanDeactivateGuard
  ]
})

export class ChamberSettledRouting {

}
