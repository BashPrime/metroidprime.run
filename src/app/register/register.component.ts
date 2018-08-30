import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  editedUser: object = {};
  registerForm: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();
  submitted = false;
  errMsg: string;

  constructor(
    private userService: UserService,
    private validatorService: ValidatorService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required]), this.validatorService.checkUsername.bind(this.validatorService)],
      email: ['', Validators.compose([Validators.email, Validators.required]),
        this.validatorService.checkEmail.bind(this.validatorService)],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: passwordMatchValidator });
  }

  registerUser() {
    if (this.registerForm.valid && !this.submitted) {
      this.errMsg = undefined;
      this.submitted = true;
      const user = Object.assign({}, this.registerForm.value);
      delete user['confirmPassword'];

      this.userService.registerUser(user).subscribe(res => {
        console.log(res);
        if (res['success']) {
          this.router.navigate(['login', {registered: true}]);
        } else {
          this.errMsg = 'Sorry, user registration failed. Please try again.';
          this.submitted = false;
        }
      });
    }
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get passwordsMatch() {
    return this.editedUser['password'] === this.editedUser['confirmPassword'];
  }
}

export function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
}
