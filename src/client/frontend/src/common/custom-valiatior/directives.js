"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var range_length_1 = require('./directives/range-length');
var min_1 = require('./directives/min');
var max_1 = require('./directives/max');
var range_1 = require('./directives/range');
var digits_1 = require('./directives/digits');
var number_1 = require('./directives/number');
var url_1 = require('./directives/url');
var email_1 = require('./directives/email');
var date_1 = require('./directives/date');
var min_date_1 = require('./directives/min-date');
var max_date_1 = require('./directives/max-date');
var date_iso_1 = require('./directives/date-iso');
var credit_card_1 = require('./directives/credit-card');
var json_1 = require('./directives/json');
var base64_1 = require('./directives/base64');
var phone_1 = require('./directives/phone');
var uuid_1 = require('./directives/uuid');
var equal_1 = require('./directives/equal');
var equal_to_1 = require('./directives/equal-to');
var ng2_select_required_1 = require("./directives/ng2-select/ng2-select-required");
var ckeditor_required_1 = require("./directives/ckeditor/ckeditor-required");
exports.CUSTOM_FORM_DIRECTIVES = [
    range_length_1.RangeLengthValidator,
    min_1.MinValidator,
    max_1.MaxValidator,
    range_1.RangeValidator,
    digits_1.DigitsValidator,
    number_1.NumberValidator,
    url_1.UrlValidator,
    email_1.EmailValidator,
    date_1.DateValidator,
    min_date_1.MinDateValidator,
    max_date_1.MaxDateValidator,
    date_iso_1.DateISOValidator,
    credit_card_1.CreditCardValidator,
    json_1.JSONValidator,
    base64_1.Base64Validator,
    phone_1.PhoneValidator,
    uuid_1.UUIDValidator,
    equal_1.EqualValidator,
    equal_to_1.EqualToValidator,
    ng2_select_required_1.Ng2SelectRequiredValidator,
    ckeditor_required_1.CkeditorRequiredValidator
];
var CustomFormsModule = (function () {
    function CustomFormsModule() {
    }
    CustomFormsModule = __decorate([
        core_1.NgModule({
            declarations: [exports.CUSTOM_FORM_DIRECTIVES],
            exports: [exports.CUSTOM_FORM_DIRECTIVES]
        })
    ], CustomFormsModule);
    return CustomFormsModule;
}());
exports.CustomFormsModule = CustomFormsModule;
