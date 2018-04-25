import {NgModule, ModuleWithProviders} from '@angular/core';
import {CustomDatePickerComponent} from "./custom-date-picker.component";
import {Daterangepicker} from "ng2-daterangepicker";
import {FormsModule} from "@angular/forms";
import {FormMessageModule} from "../control-message/index";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    Daterangepicker,
    FormsModule,
    FormMessageModule,
    CommonModule
  ],
  declarations: [
    CustomDatePickerComponent
  ],
  exports: [
    CustomDatePickerComponent
  ]
})
export class CustomDatePickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomDatePickerModule,
    };
  }
}

