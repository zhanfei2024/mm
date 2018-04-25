import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberKnowComponent} from "./chamber-know.component";
import {ChamberKnowListComponent} from "./list/chamber-know-list.component";
import {ChamberKnowPostComponent} from "./post/chamber-know-post.component";
import {AddKnowResolveService} from "./chamber-know.resolve-service";



const routes: Routes = [
  {
    path: '',
    component: ChamberKnowComponent,
    children: [
      {
        path: 'list',
        component: ChamberKnowListComponent
      },
      {
        path: 'create',
        component: ChamberKnowPostComponent
      },
      {

        path: ':ruleId/edit',
        component: ChamberKnowPostComponent,
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

export class ChamberKnowRoutingModule {

}
