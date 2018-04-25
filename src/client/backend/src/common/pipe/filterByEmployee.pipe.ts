import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterEmployee'
})
export class FilterEmployeePipe implements PipeTransform {
  constructor() {
  }

  transform(employee: any[], name: string): any[] {
    const matchNames: any = [];
    if (name.length > 0) {
     _.forEach(employee, function (item: any, index: number) {
       if (_.includes((`${item.firstName} ${item.lastName}`).toLowerCase(), name.toLowerCase())) {
         matchNames.push(item);
       }
     });
      return matchNames.length > 0 ? matchNames : [];
    } else {
      return employee;
    }
  }
}


