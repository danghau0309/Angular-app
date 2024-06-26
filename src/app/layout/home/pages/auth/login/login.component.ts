import { Component } from '@angular/core';
import { AuthService } from '../../../../../shared/service/auth/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../../../../shared/interfaces/user';
import { ToastService } from '../../../../../shared/service/toast/toast.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginForm: FormGroup;
  public userFound: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  // onSubmit() {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   this.authService.getUsers().subscribe((users: User[]) => {
  //     const { username, password } = this.loginForm.value;
  //     this.userFound = false;
  //     this.authService.login(username, password).subscribe(
  //       (response) => {
  //         if (response.success) {
  //           this.userFound = true;
  //           this.toastService.showToast('Đăng nhập thành công', '#17c964');
  //           this.authService.saveLoginFromLocalStorage(
  //             response.username,
  //             response.userId
  //           );
  //           this.router.navigate(['/']);
  //         } else {
  //           this.toastService.showToast(
  //             'Username hoặc password không đúng',
  //             '#ff0000'
  //           );
  //         }
  //       },
  //       (error) => {
  //         this.toastService.showToast('Đã có lỗi xảy ra', '#ff0000');
  //         console.error(error);
  //         return;
  //       }
  //     );

  //     // users.forEach((user: User) => {
  //     //   if (user.username === username && user.password === password) {
  //     //     this.userFound = true;
  //     //     if (user.active === 1) {
  //     //       this.toastService.showToast(
  //     //         'Tài khoản của bạn đã bị khóa',
  //     //         '#ff0000'
  //     //       );
  //     //     } else if (user.active === 0) {
  //     //       this.userFound = true;
  //     //       this.authService.saveLoginFromLocalStorage(user.username, user._id);
  //     //       this.router.navigate(['/']);
  //     //     }
  //     //   }
  //     // });
  //     if (!this.userFound) {
  //       this.toastService.showToast(
  //         'Username hoặc password không đúng',
  //         '#ff0000'
  //       );
  //     }
  //   });
  // }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        if (response.success) {
          this.toastService.showToast(response.message, 'success');
          this.authService.saveLoginFromLocalStorage(
            response.username,
            response.userId
          );
          this.router.navigate(['/']);
          return;
        }
      },
      (error) => {
        this.toastService.showToast(error.error.message, 'error');
        console.log(error.message);
      }
    );
  }
}
