import {NgModule, Directive} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {Ng2TableModule} from 'ng2-table';
import {MomentModule} from 'angular2-moment';
import {SelectModule} from 'ng2-select';
import {RouterModule} from '@angular/router';

import {
  BsDropdownModule,
  TabsModule,
  ModalModule,
  PaginationModule
} from 'ngx-bootstrap';

import {CustomFormsModule} from '../custom-valiatior';
import {FormMessageModule} from '../control-message/index';
import {PipeModule} from '../pipe/index';

export const SHARED_MODULE_DIRECTIVES = [
  // core
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  RouterModule,

  // UI plugin
  ModalModule,
  SelectModule,
  BsDropdownModule,
  Ng2TableModule,
  PaginationModule,
  TabsModule,
  ReactiveFormsModule,

  // other
  MomentModule,
  CustomFormsModule,
  FormMessageModule,
  PipeModule
];

@NgModule({
  imports: [SHARED_MODULE_DIRECTIVES],
  declarations: [],
  exports: [SHARED_MODULE_DIRECTIVES]
})
export class SharedModule {
}
