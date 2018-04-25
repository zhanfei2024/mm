import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CocNewsComponent} from "./coc-news.component";

const routes: Routes = [
  {
    path: '',
    component: CocNewsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocNewsRoutingModule {
}


