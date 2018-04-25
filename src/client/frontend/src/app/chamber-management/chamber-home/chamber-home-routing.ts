import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberHomeComponent} from "./chamber-home.component";


const routes: Routes = [
  {
    path: '',
    component: ChamberHomeComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ChamberHomeRouting {

}
