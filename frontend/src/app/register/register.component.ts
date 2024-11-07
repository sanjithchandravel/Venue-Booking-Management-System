import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  msg: string = '';
  validateMsg: string = '';
  show: boolean = false;
  constructor(private util: NodeUtilityService, private router: Router) {}
  onSubmit(form: any) {
    this.util
      .register(
        form.value.username,
        form.value.gender,
        form.value.phone,
        form.value.email,
        form.value.password
      )
      .subscribe((data) => {
        if (data.status) {
          this.msg = data.message;
          this.router.navigateByUrl('/login');
          this.validateMsg = data.message;
        } else {
          this.msg = data.message;
          this.router.navigateByUrl('/register');
          this.validateMsg = data.message;
          this.show = true;
        }
      });
  }
  validate() {
    const userName = <HTMLInputElement>document.querySelector('#username');
    const passWord = <HTMLInputElement>document.querySelector('#password');
    const gender = <HTMLInputElement>document.querySelector('#gender');
    const email = <HTMLInputElement>document.querySelector('#email');
    const cpassWord = <HTMLInputElement>document.querySelector('#cpassword');
    const phone = <HTMLInputElement>document.querySelector('#phone');
    var u1 = userName.value;
    var p1 = passWord.value;
    var cp1 = cpassWord.value;
    var g = gender.value;
    var e = email.value;
    var p = phone.value;
    if (u1.length == 0) {
      this.validateMsg = 'Enter a Valid Username';
      this.show = true;
      return false;
    }
    if (p.length == 0) {
      this.validateMsg = 'Phone Number Missing';
      this.show = true;
      return false;
    }
    if (p.length != 10) {
      this.validateMsg = 'Enter the Correct Mobile No';
      this.show = true;
      return false;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e)) {
      this.validateMsg = 'Enter a valid email address';
      this.show = true;
      return false;
    }
    if (p1.length < 8 || cp1.length < 8) {
      this.validateMsg = 'Enter a strong password';
      this.show = true;
      return false;
    }
    if (p1 != cp1) {
      this.validateMsg = "Password doesn't match";
      this.show = true;
      return false;
    }
    this.show = false;
    return true;
  }
}
