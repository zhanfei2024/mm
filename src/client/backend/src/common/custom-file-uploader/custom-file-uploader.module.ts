import {NgModule, ModuleWithProviders} from '@angular/core';
import {CustomFileUploaderComponent} from "./custom-file-uploader.component";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    TranslateModule,
    CommonModule
  ],
  declarations: [
    CustomFileUploaderComponent
  ],
  exports: [
    CustomFileUploaderComponent
  ]
})

export class CustomFileUploadModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomFileUploadModule,
    };
  }
}

