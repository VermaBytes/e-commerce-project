// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../services/auth';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './login-component.html',
// })
// export class LoginComponent {
//   email = '';
//   password = '';
//   error = '';
//   showLogin = true;
//   name = '';

//   @Output() close = new EventEmitter<void>();
//   @Output() loginSuccess = new EventEmitter<any>();

//   constructor(
//     private router: Router,
//     private authService: AuthService,
//   ) {}

//   login() {
//     const loginData = {
//       email: this.email,
//        name: this.name,
//       password: this.password,
//     };

//     this.authService.login(loginData).subscribe({
//       next: (res) => {
//         localStorage.setItem('token', res.token);
//         localStorage.setItem('isLoggedIn', 'true');

//         // USER NAME SAVE
//         localStorage.setItem("loggedUserName", this.email);
//         localStorage.setItem('loggedUserName', this.name);

//         // NAVBAR UPDATE
//         this.loginSuccess.emit({name:this.email});
//         this.loginSuccess.emit({name: res.user.name});

//         this.close.emit();

//         this.router.navigate(['/']);
//       },

//       error: (err) => {
//         this.error = err.error.message || 'Invalid Email or Password';
//       },
//     });
//   }

//   closeModal() {
//     this.close.emit();
//   }

//   goToRegister() {
//     this.router.navigate(['/register']);
//   }
// }
