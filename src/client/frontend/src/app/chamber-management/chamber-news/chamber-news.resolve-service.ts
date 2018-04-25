import {Injectable} from '@angular/core';
import {Router, Resolve,  ActivatedRouteSnapshot} from '@angular/router';
import {ChamberNewsService} from "./chamber-news.service";

@Injectable()
export class ChamberNewsResolveService implements Resolve<any> {

  constructor(private chamberNewsService: ChamberNewsService, private router: Router) {
  }

  async resolve(route:  ActivatedRouteSnapshot): Promise<any> {
    const url: number = window.location.href.search('notice');
    let id = route.params['id'];
    let name = url > 0 ? 'getFindNotice' : 'getFind';
    return await this.chamberNewsService[name](localStorage.getItem('chamber'), id).toPromise();
  }
}
