import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FullLayoutComponent} from '../common/layouts/full-layout.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {
  AccordionConfig, AccordionModule, ComponentLoaderFactory, ModalModule,
  PaginationConfig, PositioningService
} from 'ngx-bootstrap';

import {Auth} from './auth/auth.service';
import {AuthModule} from "./auth/auth.module";

import {Config} from '../common/config/config';
import {AuthConfig} from '../common/config/auth.config';
import {HttpService} from '../common/http/http.service';
import {ToasterService} from 'angular2-toaster';
import {SeoService} from '../common/global/seo';
import {HomeService} from './home/home.service';
import {IToasterModule} from '../common/iToaster/iToaster.module';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {GlobalSettingObservableService} from "../common/global/global";
import {I18nService} from "../common/i18n/i18n.service";
import {FileUploaderService} from "../common/edit-file-uploader/file-uploader.service";
import {UserComponent} from "./user/user.component";
import {ImageCropperModule} from "ng2-img-cropper";
import {CosShowModule} from './coc-show/cos-show.module';
import {HomeLayoutModule} from './coc-show/home-layout/home-layout.module';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    AccordionModule,
    ModalModule,
    CosShowModule,
    HomeLayoutModule,
    //App Module
    AuthModule,
    HttpClientModule,
    ImageCropperModule,
    //UI plugin
    IToasterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
  ],
  providers: [
    Auth,
    Config,
    AuthConfig,
    HttpService,
    ToasterService,
    SeoService,
    AccordionConfig,
    HomeService,
    I18nService,
    PaginationConfig,
    ComponentLoaderFactory,
    GlobalSettingObservableService,
    PositioningService,
    FileUploaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
