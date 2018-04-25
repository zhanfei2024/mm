import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserActivitiesComponent} from "./user-activities.component";

const routes: Routes = [
  {
    path: '',
    component: UserActivitiesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActivitiesRouting {
}


