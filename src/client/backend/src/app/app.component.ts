import {Component} from '@angular/core';
import {Auth} from './auth/auth.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private auth: Auth) {
    // this.auth.handleAuthentication();
    this.auth.startupTokenRefresh();
  }
}
