import {NgModule} from "@angular/core";
import {CustomPaginationComponent} from "./custom-pagination.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CustomPaginationComponent
  ],
  providers: [],
  exports: [
    CustomPaginationComponent
  ]
})

export class CustomPaginationModule {

}
