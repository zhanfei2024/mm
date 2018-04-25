import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import * as _ from "lodash";
import {ChamberActivityPostComponent} from "./post/chamber-activity-post.component";


@Injectable()
export class ActivityCanDeactivateGuard implements CanDeactivate<ChamberActivityPostComponent> {

  canDeactivate(component: ChamberActivityPostComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (component.titleHanlder['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.startTimedAtHanlder['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.endTimedAtHanlder['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.signUpEndTimedAtHanlder['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.addressHanlder['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }

    if (component.personnelNumberHanlder['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.descriptionHanlder['dirty'] && !component.isSave && _.isUndefined(component.activity.id)) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    } else {
      return true;
    }

  }
}
