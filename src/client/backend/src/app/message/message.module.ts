import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {MessageRoutingModule} from "./message-routing.module";
import {MessageComponent} from "./message.component";
import {MessageListComponent} from "./message-list/message-list.component";
import {MessageService} from "./message.service";



@NgModule({
  imports: [
    MessageRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    MessageComponent,
    MessageListComponent,
  ],
  providers: [MessageService]
})

export class MessageModule {

}
