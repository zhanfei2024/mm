import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NoSearchComponent} from "./no_search.component";


const routes: Routes = [
  {
    path: '',
    component: NoSearchComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoSearchRouting { }

