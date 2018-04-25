import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityCandidateComponent} from "./activity-candidate.component";
import {ActivityCandidateListComponent} from "./activity-candidate-list/activity-candidate-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: ActivityCandidateComponent,
    children: [
      {path: '', redirectTo: '/activity-candidate/list', pathMatch: 'full'},
      {path: 'list', component: ActivityCandidateListComponent},
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
export class ActivityCandidateRoutingModule {
}
