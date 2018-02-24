import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  notification: string;
  submitted: boolean = false;
  editedUser: object = {};
  errMsg: string;
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['registered']) {
        this.notification = 'You are now registered and can log in.';
      } else if (params['loggedOut']) {
        this.notification = 'You have successfully logged out.';
      }
    })
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
      this.errMsg = error.error.message;
      this.submitted = false;
    });
  }

}
