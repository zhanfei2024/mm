import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityAttachmentsDetailsComponent} from './activity-atachments-details/activity-attachments-details.component';
import {ActivityAttachmentsComponent} from "./activity-attachments.component";
import {ActivityAttachmentsListComponent} from "./activity-attachments-list/activity-attachments-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: ActivityAttachmentsComponent,
    children: [
      {path: '', redirectTo: '/activity-attachments/list', pathMatch: 'full'},
      {path: 'list', component: ActivityAttachmentsListComponent},
      {path: ':id/details', component: ActivityAttachmentsDetailsComponent}
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
export class ActivityAttachmentsRoutingModule {
}
