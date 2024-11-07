import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})
export class ForgetComponent {
  msg: string = '';
  validateMsg: string = '';
  show: boolean = false;
  constructor(private util: NodeUtilityService, private router: Router) {}
  onSubmit(form: any) {
    this.util
      .update(form.value.username, form.value.password)
      .subscribe((data) => {
        if (data.status) {
          this.msg = data.message;
          this.show = false;
          this.router.navigateByUrl('/login');
        } else {
          this.show = true;
          this.validateMsg = 'Invalid Username';
          this.router.navigateByUrl('/forget');
        }
      });
  }
  validate() {
    const userName = <HTMLInputElement>document.querySelector('#username');
    const passWord = <HTMLInputElement>document.querySelector('#password');
    const cpassWord = <HTMLInputElement>document.querySelector('#cpassword');
    var u1 = userName.value;
    var p1 = passWord.value;
    var cp1 = cpassWord.value;
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
    if (cp1.length == 0) {
      this.validateMsg = 'Confirm Password is Missing';
      this.show = true;
      return false;
    }
    if (p1 != cp1) {
      this.validateMsg = "Password doesn't match";
      this.show = true;
      return false;
    }
    this.show = true;
    return true;
  }
}
