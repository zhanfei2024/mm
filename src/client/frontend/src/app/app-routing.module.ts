import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { FullLayoutComponent } from "../common/layouts/full-layout.component";
import { CompanyLoginCheckResolve } from "./auth/login-company-check-resolve.service";
import { LoginCheckResolve } from './auth/login-check-resolve.service';
import { HomeLayoutComponent} from './coc-show/home-layout/home-layout.component';
import {UserComponent} from "./user/user.component";
import {UserMessageModule} from "./user/user-message/user-message.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/home/home.module#HomeModule', data: { preload: true }
      },
      {
        path: 'coc-list',
        loadChildren: 'app/coc-list/coc-list.module#CocListModule', data: { preload: false }
      },
      {
        path: 'activity-list',
        loadChildren: 'app/activity-list/activity-list.module#ActivityListModule', data: { preload: false }
      },
      {
        path: 'news-list',
        loadChildren: 'app/news-list/news-list.module#NewsListModule', data: { preload: false }
      },
      {
        path: 'coc-show',
        component: HomeLayoutComponent,
        children: [
          {
            path: ':id/home',
            loadChildren: 'app/coc-show/coc-home/coc-home.module#CocHomeModule', data: { preload: false }
          },
          {
            path: ':id/framework',
            loadChildren: 'app/coc-show/coc-framework/coc-framework.module#CocFrameworkModule', data: { preload: false }
          },
          {
            path: ':id/activity',
            loadChildren: 'app/coc-show/coc-activity/coc-activity.module#CocActivityModule', data: { preload: false }
          },
          {
            path: ':id/news',
            loadChildren: 'app/coc-show/coc-news/coc-news.module#CocNewsModule', data: { preload: false }
          },
          {
            path: ':id/rules',
            loadChildren: 'app/coc-show/coc-rules/coc-rules.module#CocRulesModule', data: { preload: false }
          },
          {
            path: ':id/notice',
            loadChildren: 'app/coc-show/coc-notice/coc-notice.module#CocNoticeModule', data: { preload: false }
          },
          {
            path: ':id/activity/:activityId/detail',
            loadChildren: 'app/coc-show/activity-detail/activity-detail.module#ActivityDetailModule', data: { preload: false }
          },
          {
            path: ':id/news/:newsId/detail',
            loadChildren: 'app/coc-show/news-detail/news-detail.module#NewsDetailModule', data: { preload: false }
          },
          {
            path: ':id/notice/:noticeId/detail',
            loadChildren: 'app/coc-show/notice-detail/notice-detail.module#NoticeDetailModule', data: { preload: false }
          },
          {
            path: ':id/rules/:rulesId/detail',
            loadChildren: 'app/coc-show/rules-detail/rules-detail.module#RulesDetailModule', data: { preload: false }
          },
          {
            path: ':id/tab/:tabId/detail',
            loadChildren: 'app/coc-show/tab-detail/tab-detail.module#TabDetailModule', data: { preload: false }
          }
        ]
      },
      {
        path: 'chamber/select',
        loadChildren: 'app/chamber-management/select-chamber/select-chamber.module#SelectChamberModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/home',
        loadChildren: 'app/chamber-management/chamber-home/chamber-home.module#ChamberHomeModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/member',
        loadChildren: 'app/chamber-management/chamber-member/chamber-member.module#ChamberMemberModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/payment',
        loadChildren: 'app/chamber-management/chamber-payment/chamber-payment.module#ChamberPaymentModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/tab',
        loadChildren: 'app/chamber-management/chamber-tab/chamber-tab.module#ChamberTabModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/message',
        loadChildren: 'app/chamber-management/chamber-message/chamber-message.module#ChamberMessageModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/course',
        loadChildren: 'app/chamber-management/chamber-course/chamber-course.module#ChamberCourseModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/activity',
        loadChildren: 'app/chamber-management/chamber-activity/chamber-activity.module#ChamberActivityModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/positions',
        loadChildren: 'app/chamber-management/chamber-position/chamber-position.module#ChamberPositionModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/know',
        loadChildren: 'app/chamber-management/chamber/chamber.module#ChamberModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/news',
        loadChildren: 'app/chamber-management/chamber-news/chamber-news.module#ChamberNewsModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'chamber/:id/notice',
        loadChildren: 'app/chamber-management/chamber-news/chamber-news.module#ChamberNewsModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'coc',
        loadChildren: 'app/chamber-management/chamber-settled/chamber-settled.module#ChamberSettledModule',
        data: { preload: true },
        resolve: {
          isLogin: CompanyLoginCheckResolve
        }
      },
      {
        path: 'no_search',
        loadChildren: 'app/no_search/no_search.module#NoSearchModule', data: { preload: true }
      },
      {
        path: 'auth',
        loadChildren: 'app/auth/auth.module#AuthModule', data: { preload: true }
      },
      {
        path: 'supplement',
        loadChildren: 'app/supplement/supplement.module#SupplementModule', data: { preload: true }
      },
      {
        path: 'user',
        component: UserComponent,
        resolve: {
          isLogin: LoginCheckResolve
        },
        children: [
          {
            path: 'home',
            loadChildren: 'app/user/user-home/user-home.module#UserHomeModule', data: { preload: true },
          },
          {
            path: 'info',
            loadChildren: 'app/user/user-info/user-info.module#UserInfoModule', data: { preload: true },
          },
          {
            path: 'coc',
            loadChildren: 'app/user/user-coc/user-coc.module#UserCocModule', data: { preload: true },
          },
          {
            path: 'message',
            loadChildren: 'app/user/user-message/user-message.module#UserMessageModule', data: { preload: true },
          },
          {
            path: 'activities',
            loadChildren: 'app/user/user-activities/user-activities.module#UserActivitiesModule', data: { preload: true },
          },
          {
            path: ':id/notice',
            loadChildren: 'app/user/user-notice/user-notice.module#UserNoticeModule', data: { preload: true },
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
