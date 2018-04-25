import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ForgetPasswordComponent} from './forget_password/forget_password.component';
import {ResetPasswordComponent} from './reset_password/reset_password.component';
export const AuthConfig = {
    path: '',
    children: [
      {
        path: 'auth',
        component: AuthComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'signup',
            component: SignupComponent,
          },
          {
            path: 'forget_password',
            component: ForgetPasswordComponent
          },
          {
            path: 'reset_password',
            component: ResetPasswordComponent
          }
        ]
      }
    ]
  };

