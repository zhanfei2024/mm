import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'recheck'
})
export class RecheckPipe implements PipeTransform {
  constructor() {

  }

  transform(input: string): boolean {
    return moment().diff(input, 'minutes') < 30;
  }
}
