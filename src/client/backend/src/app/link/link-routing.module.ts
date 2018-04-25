import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LinkDetailsComponent} from './link-details/link-details.component';
import {LinkComponent} from "./link.component";
import {LinkListComponent} from "./link-list/link-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: LinkComponent,
    children: [
      {path: '', redirectTo: '/link/list', pathMatch: 'full'},
      {path: 'list', component: LinkListComponent},
      {path: ':id/details', component: LinkDetailsComponent}
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
export class LinkRoutingModule {
}
