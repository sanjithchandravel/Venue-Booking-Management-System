import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent {
  user: string = '';
  msg: string = '';
  validateMsg: string = '';
  show: boolean = false;
  constructor(private util: NodeUtilityService, private router: Router) {}
  onSubmit(form: any) {
    this.util
      .remove(form.value.username, form.value.password)
      .subscribe((data) => {
        if (data.status) {
          this.msg = data.message;
          this.show = false;
          localStorage.removeItem('user');
          this.router.navigateByUrl('/landing');
        } else {
          this.show = true;
          this.validateMsg = 'Invalid Credentials';
          this.router.navigateByUrl('/delete');
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
    this.show = true;
    return true;
  }
}
