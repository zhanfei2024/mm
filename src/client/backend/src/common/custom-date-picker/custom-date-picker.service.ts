import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DatePickerService {

  private setEmptySource = new Subject<string>();

  setEmpty$ = this.setEmptySource.asObservable();

  setEmpty(icon: any) {
    this.setEmptySource.next(icon);
  }
}
