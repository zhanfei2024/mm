import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberDetailsComponent} from './member-details/member-details.component';
import {MemberComponent} from "./member.component";
import {MemberListComponent} from "./member-list/member-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      {path: '', redirectTo: '/member/list', pathMatch: 'full'},
      {path: 'list', component: MemberListComponent},
      {path: ':id/details', component: MemberDetailsComponent}
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
export class MemberRoutingModule {
}
