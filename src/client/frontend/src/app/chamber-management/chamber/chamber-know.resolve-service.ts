import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {AddKnowService} from "./chamber-know.service";

@Injectable()
export class AddKnowResolveService implements Resolve<any> {

  constructor(private addKnowService: AddKnowService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let ruleId = route.params['ruleId'];
    return await this.addKnowService.getFind(localStorage.getItem('chamber'), ruleId).toPromise();
  }
}
