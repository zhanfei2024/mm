"use strict";
var forms_1 = require('@angular/forms');
var lang_1 = require('./lang');
var CustomValidators = (function () {
    function CustomValidators() {
    }
    /**
     * Validator that requires controls to have a value of a range length.
     */
    CustomValidators.rangeLength = function (rangeLength) {
        return function (control) {
            if (lang_1.isPresent(forms_1.Validators.required(control)))
                return null;
            var v = control.value;
            return v.length >= rangeLength[0] && v.length <= rangeLength[1] ? null : { 'rangeLength': true };
        };
    };
    /**
     * Validator that requires controls to have a value of a min value.
     */
    CustomValidators.min = function (min) {
        return function (control) {
            if (lang_1.isPresent(forms_1.Validators.required(control)))
                return null;
            var v = control.value;
            return v >= min ? null : { 'min': true };
        };
    };
    /**
     * Validator that requires controls to have a value of a max value.
     */
    CustomValidators.max = function (max) {
        return function (control) {
            if (lang_1.isPresent(forms_1.Validators.required(control)))
                return null;
            var v = control.value;
            return v <= max ? null : { 'max': true };
        };
    };
    /**
     * Validator that requires controls to have a value of a range value.
     */
    CustomValidators.range = function (range) {
        return function (control) {
            if (lang_1.isPresent(forms_1.Validators.required(control)))
                return null;
            var v = control.value;
            return v >= range[0] && v <= range[1] ? null : { 'range': true };
        };
    };
    /**
     * Validator that requires controls to have a value of digits.
     */
    CustomValidators.digits = function (control) {
        if (lang_1.isPresent(forms_1.Validators.required(control)))
            return null;
        var v = control.value;
        return /^\d+$/.test(v) ? null : { 'digits': true };
    };
    /**
     * Validator that requires controls to have a value of number.
     */
    CustomValidators.number = function (control) {
        if (lang_1.isPresent(forms_1.Validators.required(control)))
            return null;
        var v = control.value;
        return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) ? null : { 'number': true };
    };
    /**
     * Validator that requires controls to have a value of url.
     */
    CustomValidators.url = function (control) {
        if (lang_1.isPresent(forms_1.Validators.required(control)))
            return null;
        var v = control.value;
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(v) ? null : { 'url': true };
    };
    /**
     * Validator that requires controls to have a value of email.
     */
    CustomValidators.email = function (control) {
        console.log('=?');
        if (lang_1.isPresent(forms_1.Validators.required(control)))
            return null;
        var v = control.value;
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) ? null : { 'email': true };
    };
    /**
     * Validator that requires controls to have a value of date.
     */
    CustomValidators.date = function (control) {
        if (lang_1.isPresent(forms_1.Validators.required(control)))
            return null;
        var v = control.value;
        return !/Invalid|NaN/.test(new Date(v).toString()) ? null : { 'date': true };
    };
    /**
     * Validator that requires controls to have a value of minDate.
     */
    CustomValidators.minDate = function (minDate) {
        if (!lang_1.isDate(minDate))
            throw Error('minDate value must be a formatted date');
        return function (control) {
            if (lang_1.isPresent(forms_1.Validators.required(control)))
                return null;
            var d = new Date(control.value);
            if (!lang_1.isDate(d))
                return { minDate: true };
            return d >= new Date(minDate) ? null : { minDate: true };
        };
    };
    /**
     * Validator that requires controls to have a value of maxDate.
     */
    CustomValidators.maxDate = function (maxDate) {
        if (!lang_1.isDate(maxDate))
            throw Error('maxDate value must be a formatted date');
        return function (control) {
            if (lang_1.isPresent(forms_1.Validators.required(control)))
                return null;
            var d = new Date(control.value);
            if (!lang_1.isDate(d))
                return { maxDate: true };
            return d <= new Date(maxDate) ? null : { maxDate: true };
        };
    };
    /**
     * Validator that requires controls to have a value of dateISO.
     */
    CustomValidators.dateISO = function (control) {
        if (lang_1.isPresent(forms_1.Validators.required(control)))
            return null;
        var v = control.value;
        return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(v) ? null : { 'dateISO': true };
    };
    /**
     * Validator that requires controls to have a value of creditCard.
     */
    CustomValidators.creditCard = function (control) {
        if (lang_1.isPresent(forms_1.Validators.required(control)))
            return null;
        var v = control.value;
        var sanitized = v.replace(/[^0-9]+/g, '');
        // problem with chrome
        if (!(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(sanitized))) {
            return { 'creditCard': true };
        }
        var sum = 0;
        var digit;
        var tmpNum;
        var shouldDouble;
        for (var i = sanitized.length - 1; i >= 0; i--) {
            digit = sanitized.substring(i, (i + 1));
            tmpNum = parseInt(digit, 10);
            if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                    sum += ((tmpNum % 10) + 1);
                }
                else {
                    sum += tmpNum;
                }
            }
            else {
                sum += tmpNum;
            }
            shouldDouble = !shouldDouble;
        }
        if (Boolean((sum % 10) === 0 ? sanitized : false)) {
            return null;
        }
        return { 'creditCard': true };
    };
    /**
     * Validator that requires controls to have a value of JSON.
     */
    CustomValidators.json = function (control) {
        if (lang_1.isPresent(forms_1.Validators.required(control)))
            return null;
        var v = control.value;
        try {
            var obj = JSON.parse(v);
            if (Boolean(obj) && typeof obj === 'object') {
                return null;
            }
        }
        catch (e) {
        }
        return { 'json': true };
    };
    /**
     * Validator that requires controls to have a value of base64.
     */
    CustomValidators.base64 = function (control) {
        if (lang_1.isPresent(forms_1.Validators.required(control)))
            return null;
        var v = control.value;
        return /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i.test(v) ? null : { 'base64': true };
    };
    /**
     * Validator that requires controls to have a value of phone.
     */
    CustomValidators.phone = function (locale) {
        var phones = {
            'zh-CN': /^(\+?0?86\-?)?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
            'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
            'en-ZA': /^(\+?27|0)\d{9}$/,
            'en-AU': /^(\+?61|0)4\d{8}$/,
            'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
            'fr-FR': /^(\+?33|0)[67]\d{8}$/,
            'de-DE': /^(\+?49|0)[1-9]\d{10}$/,
            'pt-PT': /^(\+351)?9[1236]\d{7}$/,
            'el-GR': /^(\+?30)?(69\d{8})$/,
            'en-GB': /^(\+?44|0)7\d{9}$/,
            'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
            'en-ZM': /^(\+26)?09[567]\d{7}$/,
            'ru-RU': /^(\+?7|8)?9\d{9}$/,
            'nb-NO': /^(\+?47)?[49]\d{7}$/,
            'nn-NO': /^(\+?47)?[49]\d{7}$/,
            'vi-VN': /^(0|\+?84)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
            'en-NZ': /^(\+?64|0)2\d{7,9}$/,
            'hu-HU': /^(?:\+?(?:36|\(36\)))[ -\/]?(?:(?:(?:(?!1|20|21|30|31|70|90)[2-9][0-9])[ -\/]?\d{3}[ -\/]?\d{3})|(?:(?:1|20|21|30|31|70|90)[ -\/]?\d{3}[ -\/]?\d{2}[ -\/]?\d{2}))$/,
            'nl-NL': /^(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)$/,
            'de-CH': /^(((\+|00)?41)?([ ])?(\(?0?\)?))([1-9]{2})(([ ])?[0-9]{3})(([ ])?[0-9]{2})(([ ])?[0-9]{2})$/
        };
        return function (control) {
            if (lang_1.isPresent(forms_1.Validators.required(control)))
                return null;
            var v = control.value;
            var pattern = phones[locale] || phones['en-US'];
            return (new RegExp(pattern)).test(v) ? null : { 'phone': true };
        };
    };
    /**
     * Validator that requires controls to have a value of uuid.
     */
    CustomValidators.uuid = function (version) {
        var uuid = {
            '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
            '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
            '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
            'all': /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
        };
        return function (control) {
            if (lang_1.isPresent(forms_1.Validators.required(control)))
                return null;
            var v = control.value;
            var pattern = uuid[version] || uuid.all;
            return (new RegExp(pattern)).test(v) ? null : { 'uuid': true };
        };
    };
    /**
     * Validator that requires controls to have a value to equal another value.
     */
    CustomValidators.equal = function (val) {
        return function (control) {
            if (lang_1.isPresent(forms_1.Validators.required(control)))
                return null;
            var v = control.value;
            return val === v ? null : { equal: true };
        };
    };
    /**
     * Validator that requires controls to have a value to equal another control.
     */
    CustomValidators.equalTo = function (equalControl) {
        var subscribe = false;
        return function (control) {
            if (!subscribe) {
                subscribe = true;
                equalControl.valueChanges.subscribe(function () {
                    control.updateValueAndValidity();
                });
            }
            var v = control.value;
            return equalControl.value === v ? null : { equalTo: true };
        };
    };
    return CustomValidators;
}());
exports.CustomValidators = CustomValidators;
