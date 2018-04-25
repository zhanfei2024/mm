import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CocNoticeComponent} from "./coc-notice.component";

const routes: Routes = [
  {
    path: '',
    component: CocNoticeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocNoticeRoutingModule {
}


