import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnnounceDetailsComponent} from './announce-details/announce-details.component';
import {AnnounceComponent} from "./announce.component";
import {AnnounceListComponent} from "./announce-list/announce-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: AnnounceComponent,
    children: [
      {path: '', redirectTo: '/announce/list', pathMatch: 'full'},
      {path: 'list', component: AnnounceListComponent},
      {path: ':id/:cocId/details', component: AnnounceDetailsComponent}
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
export class AnnounceRoutingModule {
}
