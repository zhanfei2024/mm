import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {CropperSettings, ImageCropperComponent} from "ng2-img-cropper";
import {ModalDirective} from "ngx-bootstrap";
import {ToasterService} from "angular2-toaster";
import * as _ from 'lodash';
import {I18nService} from "../../common/i18n/i18n.service";
import {Config} from "../../common/config/config";
import {UserObservable} from "./user.observable";
import {FileUploaderService} from "../../common/edit-file-uploader/file-uploader.service";
import {Member, UserService} from "./user.service";

@Component({
  templateUrl: './user.component.html',
  providers: [FileUploaderService,UserObservable],
})
export class UserComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public member: Member = new Member();
  public userId: string;
  public coversFilesToUpload: any[] = [];
  public loding: boolean;
  public uploadType: string = 'file';
  public uploadShow: boolean;
  formData: any;
  public data: any;
  @ViewChild('cover') cover;
  public cropperSettings: CropperSettings;
  @ViewChild('croppers') cropper: ImageCropperComponent;
  @ViewChild('coverModals') coverModal: ModalDirective;
  acceptType: string = 'application/pdf,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
    'text/csv,text/plain,application/rtf, text/rtf,text/html,aplication/zip,audio/mpeg,video/mpeg,image/jpeg,image/png,image/gif,.pdf,.doc,.docx,.ppt,' +
    '.zip,.rar,.iso,.cab,.7z';

  constructor(private user: UserService,
              private fileUploaderService: FileUploaderService,
              private config: Config,
              private toasterService: ToasterService,
              private i18nService: I18nService,
              private userObservable: UserObservable) {
    this.subscription = this.userObservable.getStatus().subscribe(date => {
      this.member.gender = date;
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getProfile();
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.keepAspect = true;
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
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

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  fileChangeEvent(fileInput: any) {
    this.setImages(fileInput);

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


  async cropCover(file: any) {
    this.coversFilesToUpload[0] = (this.fileUploaderService.dataURItoBlob(file));
    await this.makeFileRequest(this.coversFilesToUpload);
  }

  makeFileRequest(coversFiles: Array<File>): Promise<any> {
    this.loding = true;
    return new Promise((resolve, reject) => {
      if (this.uploadType === 'file') this.formData = new FormData();
      let xhr = new XMLHttpRequest();
      for (let i = 0; i < coversFiles.length; i++) {
        this.formData.append('file', coversFiles[i], `covers${i}.png`);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
            this.toasterService.pop('success', 'Success', `${this.i18nService.instant('message.file_success')}`);
            this.member.avatar = JSON.parse(xhr.response).result.avatar;
            this.loding = false;
            this.coverModal.hide();
          } else {
            reject(xhr.response);
            let message = !_.isUndefined(JSON.parse(xhr.response).message[`${localStorage.getItem('lang')}`]) ? JSON.parse(xhr.response).message[`${localStorage.getItem('lang')}`] : JSON.parse(xhr.response).message;
            this.toasterService.pop('error', 'Error', message);
            this.loding = false;
          }
        }
      };
      xhr.open('POST', `${this.config.apiEndPoint}user/users/user-profile/upload-avatar`, true);
      xhr.setRequestHeader('Authorization', `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`);
      xhr.send(this.formData);
      this.uploadShow = false;
    });
  }

  /**
   *获取用户信息
   */
  async getProfile(): Promise<any> {
    try {
      let data = await this.user.getProfile().toPromise();
      this.member = data.result;
      this.uploadShow = false;
      if(_.isNull(this.member.avatar)){
        this.member.avatar = '../../../assets/img/f_avatar.png';
        this.uploadShow = true;
      }
      this.userId = data.result.id;
      localStorage.setItem('userId', this.userId);
    } catch (err) {
      this.toasterService.pop('error', 'Error', err.message);
    }
  }
}
