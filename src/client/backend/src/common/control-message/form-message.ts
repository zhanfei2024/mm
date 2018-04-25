import {Component, Input} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'form-message',
  templateUrl: './form-message-template.html'
})
export class FormMessage {
  @Input() control: FormControl;
  @Input() fieldName: string;

  constructor() {
  }

  getMinOrMax(arr: any, type: string) {
    const result = _.find(arr, (item: any) => {
      return item[type];
    });
    if (!_.isUndefined(result)) {
      return result[type];
    }
  }
}

