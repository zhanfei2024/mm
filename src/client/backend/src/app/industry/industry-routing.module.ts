import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndustryDetailsComponent} from './industry-details/industry-details.component';
import {IndustryComponent} from "./industry.component";
import {IndustryListComponent} from "./industry-list/industry-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: IndustryComponent,
    children: [
      {path: '', redirectTo: '/industry/list', pathMatch: 'full'},
      {path: 'list', component: IndustryListComponent},
      {path: ':id/details', component: IndustryDetailsComponent}
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
export class IndustryRoutingModule {
}
