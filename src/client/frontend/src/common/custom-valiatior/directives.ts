import {NgModule, Directive} from '@angular/core';

import {RangeLengthValidator} from './directives/range-length';
import {MinValidator} from './directives/min';
import {MaxValidator} from './directives/max';
import {RangeValidator} from './directives/range';
import {DigitsValidator} from './directives/digits';
import {NumberValidator} from './directives/number';
import {UrlValidator} from './directives/url';
import {EmailValidator} from './directives/email';
import {DateValidator} from './directives/date';
import {MinDateValidator} from './directives/min-date';
import {MaxDateValidator} from './directives/max-date';
import {DateISOValidator} from './directives/date-iso';
import {CreditCardValidator} from './directives/credit-card';
import {JSONValidator} from './directives/json';
import {Base64Validator} from './directives/base64';
import {PhoneValidator} from './directives/phone';
import {UUIDValidator} from './directives/uuid';
import {EqualValidator} from './directives/equal';
import {EqualToValidator} from './directives/equal-to';
import {Ng2SelectRequiredValidator} from "./directives/ng2-select/ng2-select-required";
import {CkeditorRequiredValidator} from "./directives/ckeditor/ckeditor-required";
import {OnlyNumberValidator } from "common/custom-valiatior/directives/onlyNumber";
import {TelValidator} from 'common/custom-valiatior/directives/tel';

export const CUSTOM_FORM_DIRECTIVES: Directive[] = [
  RangeLengthValidator,
  MinValidator,
  MaxValidator,
  RangeValidator,
  DigitsValidator,
  NumberValidator,
  UrlValidator,
  EmailValidator,
  DateValidator,
  MinDateValidator,
  MaxDateValidator,
  DateISOValidator,
  CreditCardValidator,
  JSONValidator,
  Base64Validator,
  PhoneValidator,
  UUIDValidator,
  EqualValidator,
  EqualToValidator,
  Ng2SelectRequiredValidator,
  CkeditorRequiredValidator,
  OnlyNumberValidator,
  TelValidator
];

@NgModule({
  declarations: [CUSTOM_FORM_DIRECTIVES],
  exports: [CUSTOM_FORM_DIRECTIVES]
})
export class CustomFormsModule {
}
