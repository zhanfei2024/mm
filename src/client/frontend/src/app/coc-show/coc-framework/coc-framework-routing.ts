import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CocFrameworkComponent} from './coc-framework.component';

const routes: Routes = [
  {
    path: '',
    component: CocFrameworkComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocFrameworkRouting {
}


