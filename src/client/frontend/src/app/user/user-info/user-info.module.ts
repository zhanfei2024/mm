import {NgModule} from '@angular/core';
import {UserInfoRouting} from "./user-info-routing";
import {SharedModule} from "../../../common/shared/shared.module";
import {UserService} from "../user.service";
import {UserInfoComponent} from "./user-info.component";
import {CustomFileUploadModule} from "../../../common/edit-file-uploader/file-uploader.module";
import {UserObservable} from "../user.observable";


@NgModule({
  imports: [
    UserInfoRouting,
    SharedModule,
    CustomFileUploadModule,
  ],
  declarations: [
    UserInfoComponent,
  ],
  providers: [
    UserService,
    UserObservable
  ]
})

export class UserInfoModule {

}
