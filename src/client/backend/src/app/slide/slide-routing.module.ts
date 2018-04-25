import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SlideComponent} from "./slide.component";
import {SlideListComponent} from "./slide-list/slide-list.component";

const orderRoutes: Routes = [
  {
    path: '',
    component: SlideComponent,
    children: [
      {path: '', redirectTo: '/slide/list', pathMatch: 'full'},
      {path: 'list', component: SlideListComponent},
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
export class SlideRoutingModule {
}
