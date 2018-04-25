import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityDetailsComponent} from './activity-details/activity-details.component';
import {ActivityComponent} from "./activity.component";
import {ActivityListComponent} from "./activity-list/activity-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: ActivityComponent,
    children: [
      {path: '', redirectTo: '/activity/list', pathMatch: 'full'},
      {path: 'list', component: ActivityListComponent},
      {path: ':id/details', component: ActivityDetailsComponent}
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
export class ActivityRoutingModule {
}
