import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ActivityListComponent} from "./activity-list.component";

const routes: Routes = [
  {
    path: '',
    component: ActivityListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityListRoutingModule {
}


