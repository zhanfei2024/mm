import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserObservable {

  private subject = new Subject<any>();

  nextStatus(data: string) {
    this.subject.next(data);
  }

  getStatus(): Observable<string> {
    return this.subject.asObservable();
  }

}
