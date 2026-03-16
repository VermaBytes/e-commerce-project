// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../services/auth';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './register-component.html',
//   styleUrl: './register-component.css',
// })
// export class RegisterComponent {

//   name = '';
//   email = '';
//   password = '';
//   confirmPassword = '';

//   error = '';
//   success = '';

//   constructor(
//     private router: Router,
//     private authService: AuthService
//   ) {}

//   register() {

//     this.error = '';
//     this.success = '';

//     if(this.password !== this.confirmPassword){
//       this.error = "Passwords do not match";
//       return;
//     }

//     const userData = {
//       name: this.name,
//       email: this.email,
//       password: this.password
//     };

//     this.authService.register(userData).subscribe({

//       next:(res)=>{
//         this.success = res.message;

//         setTimeout(()=>{
//           this.router.navigate(['/login']);
//         },1500);
//       },

//       error:(err)=>{
//         this.error = err.error.message || "Registration failed";
//       }

//     });

//   }

// }