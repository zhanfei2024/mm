import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CocRulesComponent} from "./coc-rules.component";

const routes: Routes = [
  {
    path: '',
    component: CocRulesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocRulesRoutingModule {
}


