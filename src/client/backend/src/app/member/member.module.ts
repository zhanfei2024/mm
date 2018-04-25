import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {MemberDetailsComponent} from './member-details/member-details.component';
import {MemberRoutingModule} from "./member-routing.module";
import {MemberComponent} from "./member.component";
import {MemberService} from "./member.service";
import {MemberListComponent} from "./member-list/member-list.component";


@NgModule({
  imports: [
    MemberRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    MemberComponent,
    MemberListComponent,
    MemberDetailsComponent,
  ],
  providers: [MemberService]
})

export class MemberModule {

}
