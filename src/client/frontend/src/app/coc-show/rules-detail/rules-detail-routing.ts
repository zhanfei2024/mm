import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RulesDetailComponent} from "./rules-detail.component";

const routes: Routes = [
  {
    path: '',
    component: RulesDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesDetailRouting {
}


