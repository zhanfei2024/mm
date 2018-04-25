import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserNoticeComponent} from "./user-notice.component";

const routes: Routes = [
  {
    path: '',
    component: UserNoticeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNoticeRouting {
}


