import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from "./account.component";
import {AccountListComponent} from "./account-list/account-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {path: '', redirectTo: '/account/list', pathMatch: 'full'},
      {path: 'list', component: AccountListComponent},
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
export class AccountRoutingModule {
}
