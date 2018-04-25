import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserCocComponent} from "./user-coc.component";

const routes: Routes = [
  {
    path: '',
    component: UserCocComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCocRouting {
}


