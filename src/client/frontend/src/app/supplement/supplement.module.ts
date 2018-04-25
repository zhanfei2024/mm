import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceAgreementComponent } from './service-agreement/service-agreement.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SupplementNavbarComponent } from './supplement-navbar/supplement-navbar.component';
import {SupplementRoutingModule} from './supplement-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SupplementRoutingModule,
  ],
  declarations: [ServiceAgreementComponent, AboutUsComponent, ContactUsComponent, SupplementNavbarComponent]
})
export class SupplementModule { }
