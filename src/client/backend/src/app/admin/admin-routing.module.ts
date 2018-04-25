import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminListComponent} from "./admin-list/admin-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', redirectTo: '/admin/list', pathMatch: 'full'},
      {path: 'list', component: AdminListComponent},
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
export class AdminRoutingModule {
}
