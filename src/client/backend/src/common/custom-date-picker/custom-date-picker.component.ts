import {Component, ViewChild, Output, Input, EventEmitter, OnInit, OnChanges} from "@angular/core";
import * as _ from "lodash";
import * as moment from 'moment';
import {DaterangePickerComponent} from "ng2-daterangepicker";
import {DatePickerService} from "./custom-date-picker.service";

@Component({
  selector: 'date-picker',
  templateUrl: './custom-date-picker.component.html'
})

export class CustomDatePickerComponent implements OnInit, OnChanges {
  @ViewChild('daterangeInput') picker: DaterangePickerComponent;
  public _time;

  /**
   * 所选开始日期的双向绑定
   * @type {moment}
   */
  selectedStartedDateValue: any;
  @Output() selectedStartedDateChange = new EventEmitter();

  @Input()
  get selectedStartedDate() {
    return this.selectedStartedDateValue;
  }

  set selectedStartedDate(val) {
    this.selectedStartedDateValue = val;
    this.selectedStartedDateChange.emit(_.isEmpty(val) ? '' : (/^\s*\d\d:\d\d:\d\d/.test(this.selectedStartedDateValue) ?
      moment(this.selectedStartedDateValue, 'HH:mm:ss') : moment(this.selectedStartedDateValue)));
  }

  /**
   * 所选结束日期的双向绑定
   * @type {moment}
   */
  selectedEndedDateValue: any;
  @Output() selectedEndedDateChange = new EventEmitter();

  @Input()
  get selectedEndedDate() {
    return this.selectedEndedDateValue;
  }

  set selectedEndedDate(val) {
    this.selectedEndedDateValue = val;
    this.selectedEndedDateChange.emit(_.isEmpty(val) ? '' : (/^\s*\d\d:\d\d:\d\d/.test(this.selectedEndedDateValue) ?
      moment(this.selectedEndedDateValue, 'HH:mm:ss') : moment(this.selectedEndedDateValue)));
  }

  /**
   * forbidden为true时可选,反之不可选
   * @type {boolean}
   */
  @Input()
  forbidden: boolean = false;

  /**
   * 日期格式
   * @type {string}
   */
  @Input()
  format: string = "YYYY-MM-DD HH:mm";

  /**
   * 最大日期
   * @type {moment obj || string}
   */
  @Input()
  max: string;

  /**
   * 最小日期
   * @type {moment obj || string}
   */
  @Input()
  min: string;

  /**
   * 是否必选
   * @type {boolean}
   */
  @Input()
  requirement: boolean = false;

  /**
   * 验证名
   * @type {string}
   */
  @Input()
  fieldName: string = '';

  /**
   * 是否选择范围时间
   * @type {boolean}
   */
  @Input()
  range: boolean = false;

  /**
   * 是否只选择time隐藏日期 (父div id， 默认带日期选择 | 默认某一日 | 无日期)
   * @type {[#id, ''|'withDay'|'noDay']}
   */
  @Input() timeOnly: any = [];


  /**
   * 描述
   * @type {string}
   */
  @Input()
  placeholder: string = '';

  /**
   * 选择日期后向父组件发射data
   * @type {Object}
   */
  @Output()
  onSelectedDate = new EventEmitter<Object>();

  /**
   * 日期为空时向父组件发射data
   * @type {Object}
   */
  @Output()
  onDateEmpty = new EventEmitter<any>();

  /**
   * 是否可以删除
   * @type {boolean}
   */
  @Input()
  isDelete: boolean = true;

  public options: any = {
    locale: {format: 'YYYY-MM-DD HH:mm'},
    showDropdowns: true,
    alwaysShowCalendars: false,
    autoUpdateInput: false,
    singleDatePicker: true,
    open: "center",
    startDate: moment()
  };

  constructor(private datePickerService: DatePickerService) {
  }

  ngOnInit() {
    //setEmpty
    this.datePickerService.setEmpty$.subscribe(
      icon => {
        this._time = '';
        this.selectedStartedDate = this._time;
        this.selectedEndedDate = this._time;
      });


    if (!_.isEmpty(this.selectedStartedDate) && !_.isUndefined(this.selectedStartedDate)) this._time = (!_.isEmpty(this.selectedEndedDate) && !_.isUndefined(this.selectedEndedDate)) ? this.selectedStartedDate + ' - ' + this.selectedEndedDate : this.selectedStartedDate;
    this.options.startDate = _.isEmpty(this.selectedStartedDate) ? undefined : this.selectedStartedDate;
    this.options.endDate = _.isEmpty(this.selectedEndedDate) ? undefined : this.selectedEndedDate;
    this.options.locale.format = this.format;
    this.options.singleDatePicker = !this.range;
    this.options.parentEl = _.isEmpty(this.timeOnly) ? 'body' : this.timeOnly[0];
    if (!_.isUndefined(this.max)) this.options.maxDate = this.max;
    if (!_.isUndefined(this.min)) this.options.minDate = this.min;
    if (this.format.indexOf('HH:mm') >= 0) this.options.timePicker = true, this.options.timePicker24Hour = true;
  }

  ngOnChanges() {
    let isEmptyValue = false;
    if (this.selectedStartedDate === '') isEmptyValue = true;
    this.onDateEmpty.emit(isEmptyValue);
  }

  public applyDaterangepicker(value: any) {
    this._time = this.range ? value.picker.startDate.clone().format(this.format) + ' - ' + value.picker.endDate.clone().format(this.format) : value.picker.startDate.clone().format(this.format);
    this.selectedStartedDate = value.picker.startDate.clone().format(this.format);
    if (this.range) this.selectedEndedDate = value.picker.endDate.clone().format(this.format);
    let data = {
      startedDate: value.picker.startDate.clone(),
      endDate: value.picker.endDate.clone()
    };
    this.onSelectedDate.emit(data);
  }

  public hideDaterangepicker(event) {
    // event.picker.datePicker.setStartDate('2017-03-27');
  }

  public delete(event) {
    if (event.code === 'Backspace' && !!this.isDelete) {
      this._time = '';
      this.selectedStartedDate = this._time;
      this.selectedEndedDate = this._time;
    }
  }
}

