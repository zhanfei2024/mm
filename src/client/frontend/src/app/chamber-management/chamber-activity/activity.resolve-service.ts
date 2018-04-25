import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ChamberActivityService} from "./chamber-activity.service";

@Injectable()
export class ActivityResolveService implements Resolve<any> {

  constructor(private chamberActivityService: ChamberActivityService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let ruleId = route.params['ruleId'];
    return await this.chamberActivityService.getFind(localStorage.getItem('chamber'), ruleId).toPromise();
  }
}
