import {
  Component, Input, Output, ViewChild, EventEmitter, OnInit
} from '@angular/core';
import * as _ from 'lodash';
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {ModalDirective} from "ngx-bootstrap";
import {ToasterService} from "angular2-toaster";
import {I18nService} from "../i18n/i18n.service";
import {FileUploaderService} from "./file-uploader.service";
import {Headers} from "@angular/http";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './edit-file-uploader.component.html',
})

export class EditFileUploaderComponent implements OnInit {
  public coversFilesToUpload: any[] = [];

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
  croppedWidth: number;

  @Input()
  croppedHeight: number;

  @Input()
  width: number;

  @Input()
  height: number;

  @Input()
  typeInput: string;

  @Input()
  variants: string;

  @Input()
  showFileName: boolean = true;

  @Input()
  widthCover: string;

  @Input()
  isCover: boolean = false;

  @Input()
  id: string = 'edit-file-uploader';

  formData: any;

  name: string;
  fileName: string;
  covers: string;
  variant: string;
  fileSize: number;
  loding: boolean;
  files: any[] = [];


  acceptType: string = 'application/pdf,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
    'text/csv,text/plain,application/rtf, text/rtf,text/html,aplication/zip,audio/mpeg,video/mpeg,image/jpeg,image/png,image/gif,.pdf,.doc,.docx,.ppt,' +
    '.zip,.rar,.iso,.cab,.7z';

  /**
   * Constructor
   */
  public cropperSettings: CropperSettings;
  public data: any;
  @ViewChild('croppers') cropper: ImageCropperComponent;
  @ViewChild('coverModals') coverModal: ModalDirective;
  @Output() editChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fileUploaderService: FileUploaderService,
              private toasterService: ToasterService,
              private i18nService: I18nService) {
  }

  ngOnInit() {
    //Cropper settings
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = this.width;
    this.cropperSettings.height = this.height;
    this.cropperSettings.keepAspect = true;
    this.cropperSettings.croppedWidth = this.croppedWidth;
    this.cropperSettings.croppedHeight = this.croppedHeight;
    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;
    this.cropperSettings.rounded = false;
    this.cropperSettings.minWithRelativeToResolution = false;
    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;
    this.data = {};

    this.fileUploaderService.uploadIcon$.subscribe(
      icon => {
        this.formData = new FormData();
        this.formData.append('file', icon, 'image.png');
      });
    if (this.uploadType === 'img') this.acceptType = 'image/jpeg,image/png';

    this.name = this.i18nService.instant('chamber.btn.file_update');
    const vm = this;
    this.i18nService.translate.onLangChange.subscribe((event: any) => {
      vm.name = this.i18nService.instant('chamber.btn.file_update');
    });
    this.fileName = this.fileInput;
    this.covers = this.typeInput;
  }

  async upload(type: string): Promise<any> {
    return await this.makeFileRequest(this.url, [], this.coversFilesToUpload, type);
  }

  fileChangeEvent(fileInput: any) {
    // 若为img则调用output,且filesToUpload不存文件;若为file则存文件，不调用output
    if (this.uploadType === 'file') {
      this.setImages(fileInput);
    }
    if (this.uploadType === 'img') this.imgEvent.emit(fileInput);

    const files = fileInput.target.files;
    let tempName = '';
    _.forEach(files, (file: any) => {
      tempName += file.name + ', '
    });
    this.fileSize = files.length;
    this.fileName = ' (' + tempName.slice(0, -2) + ')';
  }

  setImages(fileInput: any) {
    this.coverModal.show();
    let image: any = new Image();
    let file: File = fileInput.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  cancel() {
    this.coversFilesToUpload = [];
    this.data.image = undefined;
    this.coverModal.hide();
  }

  async cropCover(file: any, type: string) {
    switch (type) {
      case 'course':
        this.editChange.emit({type: type, url: file});
        break;
      case 'logo':
        this.editChange.emit({type: type, url: file});
        break;
      case 'front':
        this.editChange.emit({type: type, url: file});
        break;
      case 'cover':
        this.editChange.emit({type: type, url: file});
        break;
      case 'qualification':
        this.editChange.emit({type: type, url: file});
        break;
    }
    this.coversFilesToUpload[0] = (this.fileUploaderService.dataURItoBlob(file));
    this.coverModal.hide();
  }




  makeFileRequest(url: string, params: Array<string>, coversFiles: Array<File>, type: string): Promise<any> {
    this.loding = true;
    return new Promise((resolve, reject) => {
      if (this.uploadType === 'file') this.formData = new FormData();
      let xhr = new XMLHttpRequest();
      for (let i = 0; i < coversFiles.length; i++) {
        this.formData.append('file', coversFiles[i], `covers${i}.png`);
      }
      _.forEach(this.form, (n, key) => {
        this.formData.append(key, n);
      });
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
            this.toasterService.pop('success', 'Success', `${this.i18nService.instant('message.file_success')}`);
            this.loding = false;
          } else {
            reject(xhr.response);
            this.toasterService.pop('error', 'error', JSON.parse(xhr.response).message);
            this.loding = false;
          }
        }
      };
      xhr.open(type, url, true);

      xhr.setRequestHeader('Authorization', `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`);
      switch (localStorage.getItem('lang')) {
        case 'hk':
          xhr.setRequestHeader('Accept-Language', 'zh-TW;q=0.7');
          break;
        case 'en':
          xhr.setRequestHeader('Accept-Language', 'en;q=0.8');
          break;
        case 'cn':
          xhr.setRequestHeader('Accept-Language', 'zh-CN,zh;q=0.9');
          break;
        default:
          xhr.setRequestHeader('Accept-Language', 'zh-TW;q=0.7');
      }
      xhr.send(this.formData);
    });
  }

}
