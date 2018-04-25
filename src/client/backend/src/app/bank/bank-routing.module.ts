import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankComponent} from "./bank.component";
import {BankListComponent} from "./coc-list/bank-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: BankComponent,
    children: [
      {path: '', redirectTo: '/bank/list', pathMatch: 'full'},
      {path: 'list', component: BankListComponent},
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
export class BankRoutingModule {
}
