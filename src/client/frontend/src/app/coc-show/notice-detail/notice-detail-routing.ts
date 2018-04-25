import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NoticeDetailComponent} from "./notice-detail.component";

const routes: Routes = [
  {
    path: '',
    component: NoticeDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeDetailRouting {
}


