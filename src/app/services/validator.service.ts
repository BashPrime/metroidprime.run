import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserService } from './user.service';

@Injectable()
export class ValidatorService {
  debouncerTimeout = 750;
  debouncer: any;

  constructor(private userService: UserService) { }

  checkUsername(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.userService.lookupUser(control.value).subscribe((res) => {
          if (res['success']) {
            resolve(null);
          } else {
            resolve({ 'usernameTaken': true });
          }
        }, (err) => {
          resolve({ 'usernameTaken': true });
        });
      }, this.debouncerTimeout);
    });
  }

  checkEmail(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.userService.lookupEmail(control.value).subscribe((res) => {
          if (res['success']) {
            resolve(null);
          } else {
            resolve({ 'emailTaken': true });
          }
        }, (err) => {
          resolve({ 'emailTaken': true });
        });
      }, this.debouncerTimeout);
    });
  }

}
