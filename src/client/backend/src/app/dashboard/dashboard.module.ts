import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import {SharedModule} from '../../common/shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap';
import {CustomDatePickerModule} from '../../common/custom-date-picker/custom-date-picker.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

declare var require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  dd(hc);

  return hc;
}

@NgModule({
  imports: [
    DashboardRoutingModule,
    SharedModule,
    TooltipModule,
    // BrowserAnimationsModule, // angular 4.0+ only
    CustomDatePickerModule,
    ChartModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DashboardService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ]
})

export class DashboardModule {

}
