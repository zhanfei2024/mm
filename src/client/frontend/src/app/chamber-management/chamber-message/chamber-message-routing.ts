import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberMessageComponent} from "./chamber-message.component";


const routes: Routes = [
  {
    path: '',
    component: ChamberMessageComponent,
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

export class ChamberMessageRouting {

}
