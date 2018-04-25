import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CocDetailsComponent} from './coc-details/coc-details.component';
import {CocComponent} from "./coc.component";
import {CocListComponent} from "./coc-list/coc-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: CocComponent,
    children: [
      {path: '', redirectTo: '/coc/list', pathMatch: 'full'},
      {path: 'list', component: CocListComponent},
      {path: ':id/details', component: CocDetailsComponent}
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
export class CocRoutingModule {
}
