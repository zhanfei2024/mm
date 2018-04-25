import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserHomeComponent} from "./user-home.component";

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHomeRouting {
}


