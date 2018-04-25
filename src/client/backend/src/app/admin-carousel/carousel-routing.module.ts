import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarouselListComponent} from "./carousel-list/carousel-list.component";
import {CarouselComponent} from "./carousel.component";
import {CarouselFormComponent} from "./carousel-form/carousel-form.component";
import {CarouselResolveService} from "./carousel.resolve-service";

const orderRoutes: Routes = [
  {
    path: '',
    component: CarouselComponent,
    children: [
      {path: '', redirectTo: '/carousel/list', pathMatch: 'full'},
      {path: 'list', component: CarouselListComponent},
      {path: 'creator', component: CarouselFormComponent},
      {path: ':id/edit', component: CarouselFormComponent,
        resolve: {
          FindResolve: CarouselResolveService
        }
      },
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
export class CarouselRoutingModule {
}
