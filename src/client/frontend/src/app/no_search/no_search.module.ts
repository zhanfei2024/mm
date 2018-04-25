import {NgModule} from "@angular/core";
import {SharedModule} from "../../common/shared/shared.module";
import {NoSearchComponent} from "./no_search.component";
import {NoSearchRouting} from "./no_search.routing";

@NgModule({
  imports: [
    NoSearchRouting,
    SharedModule,
  ],
  declarations: [
    NoSearchComponent
  ]
})

export class NoSearchModule {

}
