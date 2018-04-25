import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import * as _ from "lodash";
import {PostChamberNewsComponent} from "./post/post-chamber-news.component";


@Injectable()
export class NewsCanDeactivateGuard implements CanDeactivate<PostChamberNewsComponent> {

  canDeactivate(component: PostChamberNewsComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (component.titleHanlder['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.contentHanlder['dirty'] && !component.isSave && _.isUndefined(component.post.id)) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    } else {
      return true;
    }

  }
}
