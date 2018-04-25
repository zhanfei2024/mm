import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeTZ'
})
export class TimeTZPipe implements PipeTransform {
  constructor() {
  }

  transform(input: string, timezone: string, format: string): string {
    return moment(input).isValid() ? moment(input).utcOffset(timezone).format(format) : input;
  }
}
