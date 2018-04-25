import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {CourseService} from "./chamber-course.service";

@Injectable()
export class PostCourseResolveService implements Resolve<any> {

  constructor(private courseService: CourseService, private router: Router) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let ruleId = route.params['courseId'];
    return await this.courseService.getFind(localStorage.getItem('chamber'), ruleId).toPromise();
  }
}
