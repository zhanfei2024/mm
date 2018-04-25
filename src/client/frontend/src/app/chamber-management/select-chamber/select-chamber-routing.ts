import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {SelectChamberComponent} from "./select-chamber.component";


const routes: Routes = [
  {
    path: '',
    component: SelectChamberComponent,
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

export class SelectChamberRouting {

}
