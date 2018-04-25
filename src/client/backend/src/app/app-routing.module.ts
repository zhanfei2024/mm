import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {FullLayoutComponent} from '../common/layouts/full-layout.component';
import {SimpleLayoutComponent} from '../common/layouts/simple-layout.component';
import {AuthConfig} from './auth/auth-routing-module';
import {Four04Component} from './four04/four04.component';
import {PreloadSelectedModuledsList} from './preload-selected-moduleds-list';
import {LoginCheckResolve} from './auth/login-check-resolve.service';

const routes: any = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    resolve: {
      isLogin: LoginCheckResolve,
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule', data: {preload: true}
      },
      {
        path: 'users',
        loadChildren: 'app/order/users.module#UsersModule', data: {preload: true}
      },
      {
        path: 'enterprise',
        loadChildren: 'app/enterprise/enterprise.module#EnterpriseModule', data: {preload: true}
      },
      {
        path: 'coc',
        loadChildren: 'app/coc/coc.module#CocModule', data: {preload: true}
      },
      {
        path: 'post',
        loadChildren: 'app/post/post.module#PostModule', data: {preload: true}
      },
      {
        path: 'post-categories',
        loadChildren: 'app/post-category/post-category.module#PostCategoryModule', data: {preload: true}
      },
      {
        path: 'industry',
        loadChildren: 'app/industry/industry.module#IndustryModule', data: {preload: true}
      },
      {
        path: 'candidate',
        loadChildren: 'app/candidate/candidate.module#CandidateModule', data: {preload: true}
      },
      {
        path: 'activity',
        loadChildren: 'app/activity/activity.module#ActivityModule', data: {preload: true}
      },
      {
        path: 'activity-attachments',
        loadChildren: 'app/activity-attachments/activity-attachments.module#ActivityAttachmentsModule',
        data: {preload: true}
      },
      {
        path: 'activity-category',
        loadChildren: 'app/activity-category/activity-category.module#ActivityCategoryModule', data: {preload: true}
      },
      {
        path: 'link',
        loadChildren: 'app/link/link.module#LinkModule', data: {preload: true}
      },
      {
        path: 'member',
        loadChildren: 'app/member/member.module#MemberModule', data: {preload: true}
      },
      {
        path: 'bank',
        loadChildren: 'app/bank/bank.module#BankModule', data: {preload: true}
      },
      {
        path: 'rule',
        loadChildren: 'app/rule/rule.module#RuleModule', data: {preload: true}
      },
      {
        path: 'announce',
        loadChildren: 'app/announce/announce.module#AnnounceModule', data: {preload: true}
      },
      {
        path: 'message',
        loadChildren: 'app/message/message.module#MessageModule', data: {preload: true}
      },
      {
        path: 'slide',
        loadChildren: 'app/slide/slide.module#SlideModule', data: {preload: true}
      },
      {
        path: 'carousel',
        loadChildren: 'app/admin-carousel/carousel.module#CarouselModule', data: {preload: true}
      },
      {
        path: 'setting',
        loadChildren: 'app/setting/setting.module#SettingModule', data: {preload: true},
      },
      {
        path: 'activity-candidate',
        loadChildren: 'app/activity-candidate/activity-candidate.module#ActivityCandidatelModule', data: {preload: true}
      },
      {
        path: 'account',
        loadChildren: 'app/account/account.module#AccountModule', data: {preload: true}
      },
      {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule', data: {preload: true}
      },
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      AuthConfig
    ]
  },
  {
    path: '**',
    component: Four04Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: PreloadSelectedModuledsList})
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoginCheckResolve
  ],
  declarations: []
})
export class AppRoutingModule {
}
