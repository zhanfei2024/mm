import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';
import * as _ from "lodash";

const CKEDITOR_REQUIRED_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CkeditorRequiredValidator),
  multi: true
};

@Directive({
  selector: '[ckeditorRequired][formControlName],[ckeditorRequired][formControl],[ckeditorRequired][ngModel]',
  providers: [CKEDITOR_REQUIRED_VALIDATOR]
})

export class CkeditorRequiredValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    if (_.isNull(c.value) || _.isUndefined(c.value)) {
      return {'ckeditorRequired': true};
    } else {
      return c.value.length === 0 ? {'ckeditorRequired': true} : null;
    }
  }
}
