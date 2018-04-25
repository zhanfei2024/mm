import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RuleComponent} from "./rule.component";
import {RuleListComponent} from "./rule-list/rule-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: RuleComponent,
    children: [
      {path: '', redirectTo: '/rule/list', pathMatch: 'full'},
      {path: 'list', component: RuleListComponent},
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(orderRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RuleRoutingModule {
}
