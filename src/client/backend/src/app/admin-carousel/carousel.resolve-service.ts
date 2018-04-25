import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {CarouselService} from "./carousel.service";

@Injectable()
export class CarouselResolveService implements Resolve<any> {

  constructor(private carouselService: CarouselService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let id = route.params['id'];
    return await this.carouselService.find(id).toPromise();
  }
}
