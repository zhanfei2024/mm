import {NgModule} from '@angular/core';
import {SharedModule} from "../../../common/shared/shared.module";
import {CocShowService} from "../coc-show.service";
import {CocFrameworkComponent} from './coc-framework.component';
import {CocFrameworkRouting} from './coc-framework-routing';



@NgModule({
  imports: [
    CocFrameworkRouting,
    SharedModule,
  ],
  declarations: [
    CocFrameworkComponent,
  ],
  providers: [
    CocShowService,
  ]
})

export class CocFrameworkModule {

}
