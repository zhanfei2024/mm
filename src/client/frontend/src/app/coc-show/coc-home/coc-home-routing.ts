import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CocHomeComponent } from "./coc-home.component";

const routes: Routes = [
  {
    path: '',
    component: CocHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocHomeRoutingModule {
}
