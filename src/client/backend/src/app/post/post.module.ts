import {NgModule} from '@angular/core';
import {SharedModule} from '../../common/shared/shared.module';
import {CustomPaginationModule} from '../../common/custom-pagination/custom-pagination.module';
import {PostDetailsComponent} from './post-details/post-details.component';
import {PostRoutingModule} from "./post-routing.module";
import {PostComponent} from "./post.component";
import {PostService} from "./post.service";
import {PostListComponent} from "./post-list/post-list.component";


@NgModule({
  imports: [
    PostRoutingModule,
    SharedModule,
    CustomPaginationModule
  ],
  declarations: [
    PostComponent,
    PostListComponent,
    PostDetailsComponent,
  ],
  providers: [PostService]
})

export class PostModule {

}
