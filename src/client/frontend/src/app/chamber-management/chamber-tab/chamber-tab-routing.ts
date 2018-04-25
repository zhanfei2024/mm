import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChamberTabComponent} from './chamber-tab/chamber-tab.component';
import {ListComponent} from './list/list.component';
import {PostComponent} from './post/post.component';


const routes: Routes = [
  {
    path: '',
    component: ChamberTabComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'create',
        component: PostComponent
      },
      {
        path: ':id/edit',
        component: PostComponent
      }
    ]
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

export class ChamberTabRouting {
}
