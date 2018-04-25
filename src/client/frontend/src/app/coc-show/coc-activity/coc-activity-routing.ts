import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CocActivityComponent} from "./coc-activity.component";

const routes: Routes = [
  {
    path: '',
    component: CocActivityComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocActivityRoutingModule {
}


