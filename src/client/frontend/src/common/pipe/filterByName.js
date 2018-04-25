"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var FilterByNamePipe = (function () {
    function FilterByNamePipe() {
    }
    FilterByNamePipe.prototype.transform = function (input, params) {
        var output = [];
        _.forEach(input, function (value) {
            if (!_.isUndefined(value[params['target']])) {
                if (value[params['target']].indexOf(params['value']) !== -1) {
                    output.push(value);
                }
            }
            else {
                _.forEach(value, function (v, k) {
                    if (_.isPlainObject(v)) {
                        if (!_.isUndefined(v[params['target']])) {
                            if (v[params['target']].toUpperCase().indexOf(params['value'].toUpperCase()) !== -1) {
                                output.push(value);
                                return false;
                            }
                        }
                    }
                });
            }
        });
        return output;
    };
    FilterByNamePipe = __decorate([
        core_1.Pipe({
            name: 'filterByName'
        })
    ], FilterByNamePipe);
    return FilterByNamePipe;
}());
exports.FilterByNamePipe = FilterByNamePipe;
