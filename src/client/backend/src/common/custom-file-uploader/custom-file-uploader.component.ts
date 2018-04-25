import {
  Component, Input, Output, ViewChild, EventEmitter, NgZone, forwardRef, AfterViewInit,
  OnDestroy, ElementRef, OnInit
} from '@angular/core';
import * as _ from 'lodash';
import {CustomFileUploaderService} from "./custom-file-uploader.service";
import {I18nService} from '../../common/i18n/i18n.service';


@Component({
  selector: 'file-uploader',
  templateUrl: './custom-file-uploader.component.html',
  styleUrls: ['./custom-file-uploader.component.css']
})


export class CustomFileUploaderComponent implements OnInit {
  filesToUpload: Array<File> = [];

  @Input()
  form: any = {};

  @Input()
  url: string = '';

  @Input()
  authToken: string = '';

  @Input()
  uploadType: string = 'file';

  @Output()
  imgEvent = new EventEmitter<any>();

  @Input()
  fileInput: string;

  @Input()
  oldSelectedFileItems: any[] = [];

  @Output() onDeleteItems = new EventEmitter();

  @Output() fileChanged = new EventEmitter();

  @Input()
  showFileName: boolean = true;

  @Input()
  widthCover: boolean = false;

  formData: any;

  fileNameItems: string[] = [];
  name: string;
  fileName: string;
  fileSize: number;

  acceptType: string = 'application/pdf,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
    'text/csv,text/plain,application/rtf, text/rtf,text/html,aplication/zip,audio/mpeg,video/mpeg,image/jpeg,image/png,image/gif,.pdf,.doc,.docx,.ppt,' +
    '.zip,.rar,.iso,.cab,.7z';

  /**
   * Constructor
   */
  constructor(private fileUploaderService: CustomFileUploaderService,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    this.fileUploaderService.uploadIcon$.subscribe(
      icon => {
        this.formData = new FormData();
        this.formData.append('file', icon, 'image.png');
      });
    if (this.uploadType === 'img') this.acceptType = 'image/jpeg,image/png';

    this.name = this.i18nService.instant('chamber.btn.file_update');
    const vm = this;
    this.i18nService.translate.onLangChange.subscribe((event: any) => {
      vm.name = this.i18nService.instant('global.choose_file');
    });
    this.fileName = this.fileInput;
  }

  async upload(type: string) {
    return await this.makeFileRequest(this.url, [], this.filesToUpload, type);
  }

  deleteItem(b: boolean, id: string) {
    if (b) {
      _.remove(this.fileNameItems, (name: any) => name === id);
    } else {
      _.remove(this.oldSelectedFileItems, (item: any) => item.id === id);
      this.onDeleteItems.emit(id);
    }
  }

  fileChangeEvent(fileInput: any) {
    this.fileNameItems = [];
    // 若为img则调用output,且filesToUpload不存文件;若为file则存文件，不调用output
    if (this.uploadType === 'file') this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.uploadType === 'img') this.imgEvent.emit(fileInput);
    const files = fileInput.target.files;
    let tempName = '';
    _.forEach(files, (file: any) => {
      this.fileNameItems.push(file.name)
    });
    _.forEach(files, (file: any) => {tempName += file.name + ', '});
    this.fileSize = files.length;
    this.fileName = ' (' + tempName.slice(0, -2) + ')';
    this.fileChanged.emit(this);
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.uploadType === 'file') this.formData = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        if (!_.isUndefined(_.find(this.fileNameItems, (name: any) => files[i].name === name))) {
          this.formData.append('file', files[i], files[i].name);
        }
      }
      _.forEach(this.form, (n, key) => {
        this.formData.append(key, n);
      });
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open(type, url, true);
      xhr.setRequestHeader('Authorization', this.authToken);
      xhr.send(this.formData);
    });
  }

}
