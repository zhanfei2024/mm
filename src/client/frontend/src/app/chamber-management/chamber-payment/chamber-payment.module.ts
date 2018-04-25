import {NgModule} from "@angular/core";
import {ChamberPaymentRouting} from "./chamber-payment-routing";
import {ChamberPaymentSevice} from "./chamber-payment.sevice";
import {ChamberPaymentComponent} from "./chamber-payment.component";
import {SharedModule} from "../../../common/shared/shared.module";
import {CustomPaginationModule} from "../../../common/custom-pagination/custom-pagination.module";
import {DialogService} from "../../../common/dialog/dialog.service";
import {ChamberService} from "../chamber.service";



@NgModule({
  imports: [
    ChamberPaymentRouting,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    ChamberPaymentComponent
  ],
  providers: [
    ChamberPaymentSevice,
    DialogService,
    ChamberService
  ]
})

export class ChamberPaymentModule {

}
