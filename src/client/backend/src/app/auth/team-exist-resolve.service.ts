import {Injectable}             from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Auth} from "./auth.service";

@Injectable()
export class TeamExistResolve implements Resolve<Boolean> {

  constructor(private router: Router, private auth: Auth) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<Boolean> {

    let currentAppId = localStorage.getItem('team');
    // 检查是否已选择 应用
    if (currentAppId === null) {
      this.router.navigate(['/teams/create']);
      return null;
    }

    // 检查用户是否已加入应用
    let result = await this.auth.isJoined(currentAppId).toPromise();
    if (!result.joined) {
      //TODO redirect to application page for create new app or choose app
      this.router.navigate(['/teams']);
      return null;
    }

    return true;

  }
}
