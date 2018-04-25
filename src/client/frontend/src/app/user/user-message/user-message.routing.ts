import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserMessageComponent} from "./user-message.component";

const routes: Routes = [
  {
    path: '',
    component: UserMessageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMessageRouting {
}


