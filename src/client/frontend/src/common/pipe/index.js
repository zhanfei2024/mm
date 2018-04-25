"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var hour_pipe_1 = require("./hour.pipe");
var display_pipe_1 = require("./display.pipe");
var filterByField_pipe_1 = require("./filterByField.pipe");
var filterByName_1 = require("./filterByName");
var weekday_pipe_1 = require("./weekday.pipe");
var time_pipe_1 = require("./time.pipe");
var displayName_pipe_1 = require("./displayName.pipe");
var ellipsis_pipe_1 = require("./ellipsis.pipe");
var subStr_pipe_1 = require("./subStr.pipe");
var htmlToPlaintext_pipe_1 = require("./htmlToPlaintext.pipe");
var key_pipe_1 = require("./key.pipe");
var orderBy_pipe_1 = require("./orderBy.pipe");
var PipeModule = (function () {
    function PipeModule() {
    }
    PipeModule = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [
                hour_pipe_1.HourPipe,
                display_pipe_1.DisplayPipe,
                filterByField_pipe_1.FilterByFieldPipe,
                filterByName_1.FilterByNamePipe,
                weekday_pipe_1.WeekdayPipe,
                time_pipe_1.TimePipe,
                displayName_pipe_1.DisplayNamePipe,
                ellipsis_pipe_1.EllipsisPipe,
                subStr_pipe_1.subStrPipe,
                htmlToPlaintext_pipe_1.HtmlToPlaintextPipe,
                key_pipe_1.KeysPipe,
                orderBy_pipe_1.OrderByPipe
            ],
            exports: [
                hour_pipe_1.HourPipe,
                display_pipe_1.DisplayPipe,
                filterByField_pipe_1.FilterByFieldPipe,
                filterByName_1.FilterByNamePipe,
                weekday_pipe_1.WeekdayPipe,
                time_pipe_1.TimePipe,
                displayName_pipe_1.DisplayNamePipe,
                ellipsis_pipe_1.EllipsisPipe,
                subStr_pipe_1.subStrPipe,
                htmlToPlaintext_pipe_1.HtmlToPlaintextPipe,
                key_pipe_1.KeysPipe,
                orderBy_pipe_1.OrderByPipe
            ]
        })
    ], PipeModule);
    return PipeModule;
}());
exports.PipeModule = PipeModule;
