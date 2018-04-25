import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ChamberPositionService} from "./chamber-position.service";

@Injectable()
export class AddKnowResolveService implements Resolve<any> {

  constructor(private chamberPositionService: ChamberPositionService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let ruleId = route.params['ruleId'];
    return await this.chamberPositionService.getFind(localStorage.getItem('chamber'), ruleId).toPromise();
  }
}
