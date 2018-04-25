import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
// import {CustomFileUploadModule} from "../../common/edit-file-uploader/file-uploader.module";
import {CustomFileUploadModule} from "../../common/custom-file-uploader/custom-file-uploader.module";
import {SettingRoutingModule} from "./setting-routing.module";
import {SettingComponent} from "./setting.component";
import {SettingService} from "./setting.service";
import {CustomFileUploaderService} from "../../common/custom-file-uploader/custom-file-uploader.service";


@NgModule({
  imports: [
    SettingRoutingModule,
    SharedModule,
    CustomFileUploadModule
  ],
  declarations: [
    SettingComponent,
  ],
  providers: [
    SettingService,
    CustomFileUploaderService
    ]
})

export class SettingModule {

}
