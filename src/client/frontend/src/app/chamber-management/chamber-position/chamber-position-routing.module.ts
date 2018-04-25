import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberPositionComponent} from './chamber-position.component';
import {ChamberPositionListComponent} from './list/chamber-position-list.component';
import {ChamberPositionPostComponent} from './post/chamber-position-post.component';
import {AddKnowResolveService} from "./chamber-position.resolve-service";



const routes: Routes = [
  {
    path: '',
    component: ChamberPositionComponent,
    children: [
      {
        path: 'list',
        component: ChamberPositionListComponent
      },
      {
        path: 'create',
        component: ChamberPositionPostComponent
      },
      {

        path: ':ruleId/edit',
        component: ChamberPositionPostComponent,
        resolve: {
          FindResolve: AddKnowResolveService
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

export class ChamberPositionRoutingModule {

}
