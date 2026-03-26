import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-model.html',
})
export class AuthModalComponent {
// 🔹 SWITCH MODE
  
 mode: 'login' | 'register' = 'login';
  step = 1;
  email = '';
  otp = '';
  otpSent = false;
otpVerified = false;

timer = 60;
interval: any;
canResend = false;

  loading = false;
errorMsg = '';
successMsg = '';

  userData = {
    name: '',
    password: '',
    phone: ''
  };

  loginData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private toast: ToastService) {}
  @Output() close = new EventEmitter();
  @Output() loginSuccess = new EventEmitter();
  

  // 🔹 SWITCH MODE
  switchMode(type: 'login' | 'register') {
    this.mode = type;
    this.step = 1;
  }

  // 🔹 SEND OTP
  sendOtp() {
  if (!this.email) {
    this.errorMsg = "Enter email first";
    return;
  }

  this.loading = true;
  this.errorMsg = '';

  this.auth.sendOtp(this.email).subscribe({
    next: () => {
      this.loading = false;

      this.otpSent = true;
      this.canResend = false;
      this.timer = 60;

      this.toast.showToast('OTP sent 📩', 'success');

      // ⏳ timer start
      this.interval = setInterval(() => {
        this.timer--;

        if (this.timer <= 0) {
          clearInterval(this.interval);
          this.canResend = true;
        }
      }, 1000);
    },

    error: (err) => {
      this.loading = false;

      this.errorMsg = err.error?.message || 'Failed to send OTP ❌';
      this.toast.showToast(this.errorMsg, 'error');
    }
  });
}

  // 🔹 VERIFY OTP
  verifyOtp() {
  if (!this.otp) {
    this.errorMsg = "Enter OTP";
    return;
  }

  this.loading = true;
  this.errorMsg = '';

  this.auth.verifyOtp(this.email, this.otp).subscribe({
    next: () => {
      this.loading = false;

      this.otpVerified = true;

      clearInterval(this.interval);

      this.toast.showToast('OTP verified ✅', 'success');
    },

    error: (err) => {
      this.loading = false;

      this.errorMsg = err.error?.message || 'Invalid OTP ❌';
      this.toast.showToast(this.errorMsg, 'error');
    }
  });
}

  // 🔹 REGISTER
  register() {
  this.loading = true;

  const data = {
    name: this.userData.name,
    email: this.email,
    password: this.userData.password,
    phone: this.userData.phone
  };

  this.auth.register(data).subscribe({
    next: () => {
      this.loading = false;

      this.toast.showToast('Account created 🎉', 'success');

      // 👉 switch to login
      this.mode = 'login';

      // 👉 autofill email
      this.loginData.email = this.email;

      // 👉 reset states
      this.otpSent = false;
      this.otpVerified = false;
      this.otp = '';
      this.step = 1;
    },

    error: (err) => {
      this.loading = false;

      this.toast.showToast(
        err.error?.message || 'Registration failed ❌',
        'error'
      );
    }
  });
}

  // 🔹 LOGIN
  login() {
  this.loading = true;
  this.errorMsg = '';

  this.auth.login(this.loginData).subscribe({
    next: (res: any) => {
     console.log(res);
      this.loading = false;
      this.toast.showToast('Login successful 🎉', 'success');

      this.auth.saveToken(res.token);

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedUserName', res.user.name);

      this.loginSuccess.emit(res.user);

      // ⏳ auto close after delay
      setTimeout(() => {
        this.close.emit();
      }, 1200);
    },

    error: (err) => {
      this.loading = false;

      // ❌ error toast
      this.toast.showToast(
        err.error?.message || 'Login failed ❌',
        'error'
      );
    }
  });
}

showAuth = false;

openAuth() {
  this.showAuth = true;
}

closeAuth() {
  this.showAuth = false;
}

}

