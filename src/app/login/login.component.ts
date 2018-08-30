import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm') loginForm: NgForm;
  notification: { success: boolean, message: string };
  submitted = false;
  editedUser: object = {};
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['registered']) {
        this.notification = { success: true, message: 'You are now registered and can log in.' };
      } else if (params['loggedOut']) {
        this.notification = { success: true, message: 'You have successfully logged out.' };
      } else if (params['accessDenied']) {
        this.notification = { success: false, message: 'You must be logged in to do that.' };
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onLoginSubmit() {
    this.submitted = true;
    const user = Object.assign({}, this.loginForm.value);
    this.authService.authenticateUser(user).subscribe(
    data => {
      if (data['success']) {
        this.authService.storeUserData(data['token'], data['user']);
        this.router.navigate(['/']);
      }
      this.submitted = false;
    },
    error => {
      this.notification = { success: false, message: error.error.message };
      this.submitted = false;
    });
  }

}
