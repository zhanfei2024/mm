import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CandidateDetailsComponent} from './candidate-details/candidate-details.component';
import {CandidateComponent} from "./candidate.component";
import {CandidateListComponent} from "./candidate-list/candidate-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: CandidateComponent,
    children: [
      {path: '', redirectTo: '/candidate/list', pathMatch: 'full'},
      {path: 'list', component: CandidateListComponent},
      {path: ':id/details', component: CandidateDetailsComponent}
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
export class CandidateRoutingModule {
}
