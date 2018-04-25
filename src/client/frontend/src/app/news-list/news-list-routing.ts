import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NewsListComponent} from "./news-list.component";

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsListRoutingModule {
}


