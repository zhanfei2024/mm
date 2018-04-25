import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EnterpriseDetailsComponent} from './enterprise-details/enterprise-details.component';
import {EnterpriseComponent} from "./enterprise.component";
import {EnterpriseListComponent} from "./enterprise-list/enterprise-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: EnterpriseComponent,
    children: [
      {path: '', redirectTo: '/enterprise/list', pathMatch: 'full'},
      {path: 'list', component: EnterpriseListComponent},
      {path: ':id/details', component: EnterpriseDetailsComponent}
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
export class EnterpriseRoutingModule {
}
