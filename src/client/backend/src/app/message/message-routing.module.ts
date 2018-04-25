import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessageComponent} from "./message.component";
import {MessageListComponent} from "./message-list/message-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: MessageComponent,
    children: [
      {path: '', redirectTo: '/message/list', pathMatch: 'full'},
      {path: 'list', component: MessageListComponent},
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
export class MessageRoutingModule {
}
