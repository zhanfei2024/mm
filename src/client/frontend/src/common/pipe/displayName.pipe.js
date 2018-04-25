"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DisplayNamePipe = (function () {
    function DisplayNamePipe() {
    }
    DisplayNamePipe.prototype.transform = function (name, format) {
        if (format === 'firstname') {
            return name[0];
        }
        else if (format === 'lastname') {
            return name[1];
        }
        else if (format === 'lastname_firstname') {
            return name[1] + ' ' + name[0];
        }
        else {
            return name[0] + ' ' + name[1];
        }
    };
    DisplayNamePipe = __decorate([
        core_1.Pipe({
            name: 'displayName'
        })
    ], DisplayNamePipe);
    return DisplayNamePipe;
}());
exports.DisplayNamePipe = DisplayNamePipe;
