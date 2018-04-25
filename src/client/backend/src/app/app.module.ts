// Basic
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

// App
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

// Theme
import {Ng2BootstrapModule} from 'ngx-bootstrap';
import {BreadcrumbsComponent} from '../common/shared/breadcrumb.component';
import {NAV_DROPDOWN_DIRECTIVES} from '../common/shared/nav-dropdown.directive';
import {SIDEBAR_TOGGLE_DIRECTIVES} from '../common/shared/sidebar.directive';
import {AsideToggleDirective} from '../common/shared/aside.directive';

// Layouts
import {FullLayoutComponent} from '../common/layouts/full-layout.component';
import {SimpleLayoutComponent} from '../common/layouts/simple-layout.component';
import {Four04Component} from '../../src/app/four04/four04.component';

// App Module
import {AuthModule} from './auth/auth.module';
import {AuthConfig} from '../common/config/auth.config';
import {Auth} from './auth/auth.service';

// Common And Plugin
import {Config} from '../common/config/config';
import {HttpService} from '../common/http/http.service';
import {I18nService} from '../common/i18n/i18n.service';
import {SeoService} from '../common/global/seo';

// import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {
  ProgressbarModule, TooltipModule, BsDropdownModule, TabsModule, ModalModule, PaginationModule,
  BsDropdownConfig, TabsetConfig, PaginationConfig, ComponentLoaderFactory, PositioningService, TooltipConfig
} from 'ngx-bootstrap';

import {SelfObservableService, GlobalSettingObservableService} from '../common/global/global';

import {IToasterModule} from '../common/iToaster/iToaster.module';
import {PipeModule} from '../common/pipe/index';
import {DialogService} from '../common/dialog/dialog.service';
import {DatePickerService} from '../common/custom-date-picker/custom-date-picker.service';
import {PreloadSelectedModuledsList} from './preload-selected-moduleds-list';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    // App Module
    AuthModule,
    PipeModule,

    // UI plugin
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot(),
    IToasterModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    Four04Component,
  ],
  providers: [
    Auth,
    Config,
    AuthConfig,
    HttpService,
    I18nService,
    PreloadSelectedModuledsList,
    SeoService,
    BsDropdownConfig,
    TabsetConfig,
    PaginationConfig,
    ComponentLoaderFactory,
    PositioningService,
    TooltipConfig,
    DialogService,
    SelfObservableService,
    GlobalSettingObservableService,
    DatePickerService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
