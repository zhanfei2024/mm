import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CustomFileUploaderService {

  private uploadIconSource = new Subject<string>();

  uploadIcon$ = this.uploadIconSource.asObservable();

  uploadIcon(icon: any) {
    this.uploadIconSource.next(icon);
  }
}
