import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  user: string = '';
  msg: string = '';
  show: boolean = false;
  validateMsg: string = '';
  constructor(private util: NodeUtilityService, private router: Router) {}
  onSubmit(form: any) {
    this.util
      .login(form.value.username, form.value.password)
      .subscribe((data) => {
        if (data.status) {
          localStorage.setItem('user', form.value.username);
          this.msg = data.message;
          this.show = false;
          if (form.value.username == 'admin') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/home');
          }
        } else {
          this.msg = data.message;
          this.show = true;
          this.validateMsg = 'Invalid Credential';
          this.router.navigateByUrl('/login');
        }
      });
  }
  validate() {
    const userName = <HTMLInputElement>document.querySelector('#username');
    const passWord = <HTMLInputElement>document.querySelector('#password');
    var u1 = userName.value;
    var p1 = passWord.value;
    if (u1.length == 0) {
      this.validateMsg = 'Username is Missing';
      this.show = true;
      return false;
    }
    if (p1.length == 0) {
      this.validateMsg = 'Password is Missing';
      this.show = true;
      return false;
    }
    this.show = false;
    return true;
  }
}
