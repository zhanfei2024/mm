import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';
import * as _ from 'lodash';

const NG2_SELECT_REQUIRED_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => Ng2SelectRequiredValidator),
  multi: true
};

@Directive({
  selector: '[ng2SelectRequired][formControlName],[ng2SelectRequired][formControl],[ng2SelectRequired][ngModel]',
  providers: [NG2_SELECT_REQUIRED_VALIDATOR]
})
export class Ng2SelectRequiredValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    if (_.isUndefined(c.value)) {
      return {'ng2SelectRequired': true};
    } else {
      return Array.isArray(c.value) && c.value.length === 0 ? {'ng2SelectRequired': true} : null;
    }
  }
}
