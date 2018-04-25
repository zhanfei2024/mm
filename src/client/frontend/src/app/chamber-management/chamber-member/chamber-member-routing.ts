import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberMemberComponent} from "./chamber-member.component";
import {ChamberMemberListComponent} from "./list/chamber-member-list.component";
import {ChamberMemberExamineComponent} from "./member-examine/chamber-member-examine.component";
import {ChamberMemberExamineShowComponent} from "./examine/chamber-member-examine-show.component";


const routes: Routes = [
  {
    path: '',
    component: ChamberMemberComponent,
    children: [
      {
        path: 'examine',
        component: ChamberMemberListComponent
      },
      {
        path: 'list',
        component: ChamberMemberExamineComponent
      },
      {
        path: ':id/examine',
        component: ChamberMemberExamineShowComponent
      },
      {
        path: ':id/show',
        component: ChamberMemberExamineShowComponent
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

export class ChamberMemberRouting {

}
