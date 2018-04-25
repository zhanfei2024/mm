import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./users.component";
import {UsersListComponent} from "./user-list/users-list.component";
import {InvtationListComponent} from "./invitation/invtation-list.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {path: 'list', component: UsersListComponent},
      {path: 'invitation', component: InvtationListComponent},
      {path: ':id/details', component: UserDetailsComponent}
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
export class UsersRoutingModule {
}
