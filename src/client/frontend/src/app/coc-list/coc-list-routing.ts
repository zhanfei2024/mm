import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CocListComponent} from "./coc-list.component";

const routes: Routes = [
  {
    path: '',
    component: CocListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocListRoutingModule {
}


