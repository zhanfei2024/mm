import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import * as _ from "lodash";
import {ChamberSettledPostComponent} from "./chamber-settled-post.component";


@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ChamberSettledPostComponent> {

  canDeactivate(component: ChamberSettledPostComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
    // if (component.firstNameHandler['dirty'] && !!component.firstNameHandler['model'] && !component.isSave && component.isShow) {
    //   return (window.confirm(component.translate.instant('panel.message.no_edit')));
    // }
    // if (component.lastNameHandler['dirty'] && !!component.lastNameHandler['model'] && !component.submitLoading && component.isShow) {
    //   return (window.confirm(component.translate.instant('panel.message.no_edit')));
    // }
    // if (component.ePhoneHandler['dirty'] && !!component.ePhoneHandler['model'] && !component.submitLoading && component.isShow) {
    //   return (window.confirm(component.translate.instant('panel.message.no_edit')));
    // }
    // if (component.eEmailHandler['dirty'] && !!component.eEmailHandler['model'] && !component.submitLoading && component.isShow) {
    //   return (window.confirm(component.translate.instant('panel.message.no_edit')));
    // }
    if (component.nameHandler['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }

    if (component.foundingDateHandler['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.contactsHandler['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.phoneHandler['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.emailHandler['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.phoneHandler['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.addressHandler['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.purposeHandler['dirty'] && !component.isSave) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    }
    if (component.descriptionHandler['dirty'] && !component.isSave && _.isUndefined(component.settled.id)) {
      return (window.confirm(component.translate.instant('message.no_edit')));
    } else {
      return true;
    }

  }
}
