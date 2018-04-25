import {Component, OnInit, ViewChild, AfterViewChecked, DoCheck, ElementRef} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import * as _ from 'lodash';
import * as moment from 'moment';
import {Config} from '../../../common/config/config';
import {Router, ActivatedRoute} from '@angular/router';
import {UserService, UserExperience, UserEducation, Member, UserCompany, Item} from '../user.service';
import {FileUploaderService} from '../../../common/edit-file-uploader/file-uploader.service';
import {ToasterService} from 'angular2-toaster';
import {SeoService} from '../../../common/global/seo';
import {TranslateService} from '@ngx-translate/core';
import {UserObservable} from '../user.observable';

declare var laydate;

@Component({
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit, DoCheck {
  public post: any;
  public isMemberEmpty: boolean;
  public isEdit: boolean;
  public now: boolean;
  public currentDate: string;
  public fileName: string;
  public experienceLoading: boolean;
  public companyLoading: boolean;
  public educationLoading: boolean;
  public experiences: UserExperience[];
  public experience: UserExperience = new UserExperience();
  public companies: UserCompany[];
  public company: UserCompany = new UserCompany();
  public educations: UserEducation[];
  public education: UserEducation = new UserEducation();

  public member: Member = new Member();
  public cMember: Member = new Member();
  public self: Member = new Member();
  public userEmail: string;
  public regEx: string;
  public isaddExperience: boolean = true;
  public isaddEducation: boolean = true;
  public genders: any[];
  public activeGenders: any[] = [];
  public countryIds: any[] = [{id: 1, text: '香港'}];
  public activeIDTypes: any[] = [];
  public IDTypes: any[];
  public industry: any[];
  public industries: any[];
  public activeIndustry: any[];
  public educationLevels: any[] = [];
  public activeEducationLevels: any[] = [];
  public activrCountryIds: any[] = [];
  public isCover: boolean = false;
  @ViewChild('experienceModal') experienceModal: ModalDirective;
  @ViewChild('educationModal') educationModal: ModalDirective;
  @ViewChild('age') _layAgeDate: ElementRef;
  @ViewChild('endDate') _layEndDate: ElementRef;
  @ViewChild('startedDate') _layStartedDate: ElementRef;
  @ViewChild('EstartDate') _layEstartDate: ElementRef;
  @ViewChild('EendDate') _layEendDate: ElementRef;

  public isExperienceAdd: boolean;
  public isCompanyShow: boolean = false;
  public isCompanyAdd: boolean;
  public isEducationAdd: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private user: UserService,
              private toasterService: ToasterService,
              private seoService: SeoService,
              private translateService: TranslateService,
              private config: Config,
              private fileUploaderService: FileUploaderService,
              private userObservable: UserObservable) {
  }

  ngDoCheck() {
    this.seoService.setTitle(this.translateService.instant('user.navbar.my_information'), this.seoService.getTitleContent());
    this.educationLevels = [
      this.translateService.instant('user.user_education.education_level.master'),
      this.translateService.instant('user.user_education.education_level.post-graduate'),
      this.translateService.instant('user.user_education.education_level.degree'),
      this.translateService.instant('user.user_education.education_level.college'),
      this.translateService.instant('user.user_education.education_level.doctor'),
      this.translateService.instant('user.user_education.education_level.school-certificate'),
      this.translateService.instant('user.user_education.education_level.any'),
    ];
    this.IDTypes = [
      {id: 1, text: this.translateService.instant('global.id')},
      {id: 2, text: this.translateService.instant('global.pass')},
      {id: 3, text: this.translateService.instant('global.passport')},
      {id: 4, text: this.translateService.instant('global.driver')}
    ];
    this.genders = [
      {id: 1, text: this.translateService.instant('global.M')},
      {id: 2, text: this.translateService.instant('global.F')}];
  }

  ngOnInit() {
    this.addLayDate(this._layAgeDate, 'age');
    this.addLayDate(this._layEndDate, 'experience', 'endedDate');
    this.addLayDate(this._layStartedDate, 'experience', 'startedDate');
    this.addLayDate(this._layEstartDate, 'education', 'startDate');
    this.addLayDate(this._layEendDate, 'education', 'endDate');

    this.getProfile();
    this.getExperience();
    this.getCompany();
    this.getEducation();
    this.getIndustry()
    this.currentDate = moment().format('YYYY-MM-DD');
    this.userEmail = localStorage.getItem('email');
  }

  reject(event: Event): void {
    this.isEdit = false;
    this.getProfile();
    event.stopPropagation();
  }

  /**
   *教育背景字体转换
   */
  educationLevel(data: any, Forward: boolean): void {
    if (Forward) {
      switch (data) {
        case 'master':
          this.education.educationLevel = this.translateService.instant('user.user_education.education_level.master');
          break;
        case 'post-graduate':
          this.education.educationLevel = this.translateService.instant('user.user_education.education_level.post-graduate');
          break;
        case 'doctor':
          this.education.educationLevel = this.translateService.instant('user.user_education.education_level.doctor');
          break;
        case 'degree':
          this.education.educationLevel = this.translateService.instant('user.user_education.education_level.degree');
          break;
        case 'college':
          this.education.educationLevel = this.translateService.instant('user.user_education.education_level.college');
          break;
        case 'school-certificate':
          this.education.educationLevel = this.translateService.instant('user.user_education.education_level.school-certificate');
          break;
        case 'any':
          this.education.educationLevel = this.translateService.instant('user.user_education.education_level.any');
          break;
      }
    } else {
      switch (data) {
        case this.translateService.instant('user.user_education.education_level.master'):
          this.education.educationLevel = 'master';
          break;
        case this.translateService.instant('user.user_education.education_level.post-graduate'):
          this.education.educationLevel = 'post-graduate';
          break;
        case this.translateService.instant('user.user_education.education_level.doctor'):
          this.education.educationLevel = 'doctor';
          break;
        case this.translateService.instant('user.user_education.education_level.degree'):
          this.education.educationLevel = 'degree';
          break;
        case this.translateService.instant('user.user_education.education_level.college'):
          this.education.educationLevel = 'college';
          break;
        case this.translateService.instant('user.user_education.education_level.school-certificate'):
          this.education.educationLevel = 'school-certificate';
          break;
        case this.translateService.instant('user.user_education.education_level.any'):
          this.education.educationLevel = 'any';
          break;
      }
    }

  }

  changeNow() {
    if (this.now) {
      this.experience.endedDate = moment(new Date()).format('YYYY-MM-DD');
    } else {
      this.experience.endedDate = '';
    }
  }

  /**
   *模态框控制
   */
  showModal(status: string, item?: any): void {
    switch (status) {
      case 'experience':
        this.experienceModal.show();
        this.experience = _.isUndefined(item) ? new UserExperience() : item;
        this.isExperienceAdd = _.isUndefined(item) ? true : false;
        break;
      case 'company':
        this.isCompanyShow = true;
        this.company = _.isUndefined(item) ? new UserCompany() : item;
        this.activeIndustry = _.isUndefined(item) ? [''] : [item['industry']['name']];
        this.isCompanyAdd = _.isUndefined(item) ? true : false;
        break;
      case 'education':
        this.educationModal.show();
        this.education = _.isUndefined(item) ? new UserEducation() : item;
        this.isEducationAdd = _.isUndefined(item) ? true : false;
        /*educationLevel正转*/
        if (item) {
          this.educationLevel(item.educationLevel, true);
          this.activeEducationLevels = [item.educationLevel];
        }
    }
  }

  onHidden(status: string): void {
    switch (status) {
      case 'experience':
        this.experienceModal.hide();
        this.experience = new UserExperience();
        break;
      case 'company':
        this.isCompanyShow = false;
        this.company = new UserCompany();
        this.activeIndustry = [];
        break;
      case 'education':
        this.educationModal.hide();
        this.education = new UserEducation();
        this.activeEducationLevels = [];
        break;
    }

  }


  checkReg(value): void {
    switch (value) {
      case this.translateService.instant('global.id'):
        this.member.IDType = 'id';
        this.self.IDType = 'id';
        this.regEx = '[A-Z][0-9]{6}\\([0-9A]\\)';
        break;
      case this.translateService.instant('global.pass'):
        this.member.IDType = 'pass';
        this.self.IDType = 'pass';
        this.regEx = '';
        console.log(this.regEx, '---------')
        break;
      case this.translateService.instant('global.passport'):
        this.member.IDType = 'passport';
        this.self.IDType = 'passport';
        this.regEx = '';
        break;
      case this.translateService.instant('global.driver'):
        this.member.IDType = 'driver';
        this.self.IDType = 'driver';
        this.regEx = '';
        console.log(this.regEx, '---------')
        break;
    }
  }

  /**
   *下拉框选中
   */
  public selected(value: any, state: string): void {
    switch (state) {
      case 'genders':
        switch (value.text) {
          case this.translateService.instant('global.M'):
            this.member.gender = 'M';
            this.self.gender = 'M';
            break;
          case this.translateService.instant('global.F'):
            this.member.gender = 'F';
            this.self.gender = 'F';
            break;
        }
        break;
      case 'countryIds':
        switch (value.text) {
          case '香港':
            this.member.countryId = '99';
            this.self.countryId = '99';
            break;
        }
        break;
      case 'IDTypes':
        this.checkReg(value.text)
        break;
      case 'industry':
        this.company.industryId = this.industries.filter(item => item.name === value.text)[0]['id'];
        break;
      case 'educationLevels':
        switch (value.text) {
          case this.translateService.instant('user.user_education.education_level.master'):
            this.education.educationLevel = 'master';
            break;
          case this.translateService.instant('user.user_education.education_level.post-graduate'):
            this.education.educationLevel = 'post-graduate';
            break;
          case this.translateService.instant('user.user_education.education_level.doctor'):
            this.education.educationLevel = 'doctor';
            break;
          case this.translateService.instant('user.user_education.education_level.degree'):
            this.education.educationLevel = 'degree';
            break;
          case this.translateService.instant('user.user_education.education_level.college'):
            this.education.educationLevel = 'college';
            break;
          case this.translateService.instant('user.user_education.education_level.school-certificate'):
            this.education.educationLevel = 'school-certificate';
            break;
          case this.translateService.instant('user.user_education.education_level.any'):
            this.education.educationLevel = 'any';
            break;
        }
        break;
    }
  }


  /**
   *获取行业
   */
  async getIndustry(): Promise<any> {
    try {
      let data = await this.user.getIndustry().toPromise();
      this.industries = data.result;
      this.industry = data.result.map(item => {
        return item.name
      })
    } catch (err) {
      this.toasterService.pop('err', 'Error', err.message);
    }
  }

  /**
   *新增用户
   */
  async onSubmit(data): Promise<any> {
    try {
      await this.user.createProfile(data).toPromise();
      let response = await this.user.getProfile().toPromise();
      this.member = response.result;
      this.self = this.member;
      this.isMemberEmpty = _.isEmpty(this.member);
      this.toasterService.pop('success', 'success', this.translateService.instant('user.message.basic_information_added_success'));
    } catch (err) {
      this.toasterService.pop('err', 'Error', this.translateService.instant('user.message.basic_information_added_fail'));
    }
  }

  /**
   *修改用户信息
   */
  async editProfile(data): Promise<any> {
    this.editBaseInfo(data);
  }

  /**
   *修改用户基本信息
   */
  async editBaseInfo(data: any): Promise<any> {
    let result = await this.user.updateProfile(data).toPromise();
    let sentGender = result['result'].gender;
    this.userObservable.nextStatus(sentGender);
    let response = await await this.user.getProfile().toPromise();
    this.self = response.result;
    this.toasterService.pop('success', 'success', this.translateService.instant('user.message.basic_information_edit_success'));
    this.isEdit = false;
  }


  /**
   *获取用户信息
   */
  async getProfile(): Promise<any> {
    try {
      let data = await this.user.getProfile().toPromise();
      this.member = data.result;
      this.checkReg(this.translateService.instant(`global.${this.member.IDType}`));
      this.self = data.result;
      this.member.name = this.self.name === null ? '' : this.self.name;
      this.member.IDType = this.self.IDType === null ? 'id' : this.self.IDType;
      this.activrCountryIds = [this.translateService.instant('global.99')]
      this.isMemberEmpty = _.isEmpty(this.member);
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
    }
  }


  /**
   *获取工作经验列表
   */
  async getExperience(): Promise<any> {
    try {
      this.experienceLoading = true;
      let data = await this.user.getExperience().toPromise();
      this.experienceLoading = false;
      this.experiences = data.result;
    } catch (err) {
      this.experienceLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   * 提交工作经验表单
   */
  submitExperience(): void {
    if (this.isExperienceAdd) {
      this.addExperience();
    } else {
      this.editExperience(this.experience);
    }
  }

  /**
   *添加工作经验
   */
  async addExperience(): Promise<any> {
    try {
      this.isaddExperience = true;
      await this.user.postExperience(this.experience).toPromise();
      this.experience = new UserExperience();
      let response = await this.user.getExperience().toPromise();
      this.experiences = response.result;
      this.isaddExperience = false;
      this.toasterService.pop('success', 'success', this.translateService.instant('user.message.experience_add_success'));
    } catch (err) {
      this.isaddExperience = false;
      this.experience = new UserExperience();
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *修改工作经验
   */
  async editExperience(data: any): Promise<any> {
    try {
      data.startedDate = moment(data.startedDate).format('YYYY-MM-DD');
      data.endedDate = moment(data.endedDate).format('YYYY-MM-DD');
      await this.user.updatExperience(data).toPromise();
      this.toasterService.pop('success', 'success', this.translateService.instant('user.message.experience_edit_success'));
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   * 提交我的公司表单
   *
   */
  submitCompany(): void {
    if (this.isCompanyAdd) {
      this.addCompany()
    } else {
      this.editCompany(this.company);
    }
  }

  /**
   *获取我的公司列表
   */
  async getCompany(): Promise<any> {
    try {
      this.companyLoading = true;
      let data = await this.user.getCompany().toPromise();
      this.companyLoading = false;
      this.companies = data.result;
    } catch (err) {
      this.companyLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *添加公司
   */
  async addCompany(): Promise<any> {
    try {
      await this.user.postCompany(this.company).toPromise();
      let response = await this.user.getCompany().toPromise();
      this.companies = response.result;
      this.getCompany()
      this.toasterService.pop('success', 'success', this.translateService.instant('user.message.company_add_success'));
    } catch (err) {
      this.company = new UserCompany();
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *修改公司
   */
  async editCompany(data: any): Promise<any> {
    try {
      await this.user.putCompany(data).toPromise();
      this.getCompany()
      this.toasterService.pop('success', 'success', this.translateService.instant('user.message.company_edit_success'));
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
    }
  }


  /**
   *获取教育背景列表
   */
  async getEducation(): Promise<any> {
    try {
      this.educationLoading = true;
      let data = await this.user.getEducation().toPromise();
      this.educationLoading = false;
      this.educations = data.result.map(item => {
        item.startDate = moment(item.startDate).format('YYYY-MM-DD');
        item.endDate = moment(item.endDate).format('YYYY-MM-DD');
        this.educationLevel(item, true)
        return item;
      });
    } catch (err) {
      this.educationLoading = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   * 提交教育背景
   */
  submitEducation(): void {
    if (this.isEducationAdd) {
      this.addEducation();
      this.education = new UserEducation();
    } else {
      this.editeEducation(this.education);
      this.education = new UserEducation();
    }
  }

  /**
   *添加学历
   */
  async addEducation(): Promise<any> {
    try {
      this.isaddEducation = true;
      this.education.startDate = moment(this.education.startDate).format('YYYY-MM-DD');
      this.education.endDate = moment(this.education.endDate).format('YYYY-MM-DD');
      await this.user.postEducation(this.education).toPromise();
      this.isaddEducation = false;
      let response = await this.user.getEducation().toPromise();
      this.educations = response.result;
      this.toasterService.pop('success', 'success', this.translateService.instant('user.message.education_add_success'));
      await this.getEducation();
    } catch (err) {
      this.education = new UserEducation();
      this.isaddEducation = false;
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  /**
   *修改学历
   */
  async editeEducation(data: any): Promise<any> {
    try {
      data.educationLevel = this.education.educationLevel;
      data.startDate = moment(data.startDate).format('YYYY-MM-DD');
      data.endDate = moment(data.endDate).format('YYYY-MM-DD');
      this.educationLevel(data.educationLevel, false)
      await this.user.putEducation(data).toPromise();
      this.toasterService.pop('success', 'success', this.translateService.instant('user.message.education_edit_success'));
    } catch (err) {
      this.toasterService.pop('err', 'err', err.message);
    }
  }

  //删除
  async delete(name: string, id: number) {
    try {
      await this.user[name](id).toPromise();
      this.toasterService.pop('success', 'success', this.translateService.instant('message.delete_success'));
      switch (name) {
        case 'deleteEducation':
          _.remove(this.educations, value => value.id === id);
          break;
        case 'deleteCompany':
          _.remove(this.companies, value => value.id === id);
          break;
        case 'deleteExperience':
          _.remove(this.experiences, value => value.id === id);
          break;
      }
    } catch (err) {
      this.toasterService.pop('error', 'error', err.meassge);
    }
  }

  addLayDate(elem: any, model: any, text?: any) {
    laydate.render({
      elem: elem.nativeElement
      , theme: '#0b409c'
      , lang: localStorage.getItem('lang')
      , done: (value) => {
        switch (model) {
          case 'age':
            this.member.age = value
            break;
          case 'experience':
            this.experience[text] = value
            break;
          case 'education':
            this.education[text] = value
            break;
        }
      }
    });
  }

}
