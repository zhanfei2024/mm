import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ChamberService} from "../../chamber.service";

@Injectable()
export class ChamberSettledResolveService implements Resolve<any> {

  constructor(private chamberService: ChamberService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let id = route.params['id'];
    return await this.chamberService.getFindCoc(id).toPromise();
  }
}
