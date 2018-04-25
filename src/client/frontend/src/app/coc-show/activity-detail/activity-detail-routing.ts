import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ActivityDetailComponent} from "./activity-detail.component";

const routes: Routes = [
  {
    path: '',
    component: ActivityDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityDetailRouting {
}


