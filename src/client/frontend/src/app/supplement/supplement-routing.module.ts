import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SupplementNavbarComponent} from './supplement-navbar/supplement-navbar.component';
import {ServiceAgreementComponent} from './service-agreement/service-agreement.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: SupplementNavbarComponent,
    children: [
      {
        path: 'service-agreement',
        component: ServiceAgreementComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      }
    ]
  },
]

@NgModule ({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ],
})
export class SupplementRoutingModule {

}
