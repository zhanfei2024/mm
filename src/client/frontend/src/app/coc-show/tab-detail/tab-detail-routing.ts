import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TabDetailComponent} from './tab-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TabDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabDetailRouting {
}


