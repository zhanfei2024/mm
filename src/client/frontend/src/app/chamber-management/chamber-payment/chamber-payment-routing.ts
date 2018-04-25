import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChamberPaymentComponent} from "./chamber-payment.component";


const routes: Routes = [
  {
    path: '',
    component: ChamberPaymentComponent,
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

export class ChamberPaymentRouting {

}
